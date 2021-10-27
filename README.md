## Инициализация проекта

Стартуем проект как написано в документации через `yarn create nuxt-app`.

Для теста подключим UI-библиотеку BalmUI. Я эту библиотеку раньше не видел, не использовал, не
слышал - именно это стало решающим в выборе.

Для тестов и замеров перфоманса, чтобы было все честно, нам нужно задеплоить наше приложение. 
Для это используем [heroku](https://heroku.com/). Подключаем репозиторий.  Жмем ок. Вот, в пару кликов мир увидел
наше [Приложение](https://nuxt-optimize.herokuapp.com/)

## Первый тест

Открываем page-speed, вставляем наш url, жмем _анализировать_, о!!!, 98 попугаев. На этом месте идут хвалы создателям vue
и nuxt. А на мобилках? Упс... 57? За что? Смотрим ниже:

- __Устраните ресурсы, блокирующие отображение__ `/tailwind.min.css`
- __Удалите неиспользуемый код CSS__ `/tailwind.min.css`
- __Удалите неиспользуемый код JavaScript__ 345kiB
- __Сократите время до получения первого байта от сервера__ 1180ms

### Разбираемся

Открываем devtools -> network
![devtools](pictures/dev-tools.9a2c62c6.png)

Чтобы было понятней, что там грузится, допишем в конфиг:

```javascript
// nuxt.config.js

build: {
  filenames: {
    chunk: () => '[name].[id].[contenthash].js'
  }
}
```

Это позволяет увидеть человекочитаемые имена чанков,

#### tailwind

Мы же не подключали... Поиск по проекту, и ага! Это подключено в демо-компоненте, причем link внутри template. Сносим.

> Несмотря на то, что эта проблема не возникла бы в реальном приложении оставил,
> что бы показать куда надо смотреть в первую очередь

### Вторая попытка

Коммитим, дожидаемся [деплоя](https://ssr-optimize2.herokuapp.com/), смотрим:

![page-speed](page-speed-results/state2.png)

80. Уже лучше, но не "зелененькое". Из явных проблем осталось только:

- __Удалите неиспользуемый код JavaScript__ 345kiB

И иногда (разные итерации теста показывают разные результаты):

- __Сократите время до получения первого байта от сервера__ 811ms

### Разбираемся 2

#### Сократите время до получения первого байта от сервера

Чтобы больше на этом не останавливаться, расскажу о втором.

Нужно понимать, что происходит при обращении по url нашего приложения. 
Запрос с клиента попадает в веб-сервер nuxt, который рендерит документ. 
Он делает много работы, поэтому это не быстро. Так как page-speed не учитывает эту метрику в
своих оценках, то и я не буду останавливаться на этом. 
Скажу только, что лечится это кешированием. 
Для этого лучше использовать отдельный сервер, например, __nginx__

#### Неиспользуемый код

Ну тут ни чего пока страшного: мы взяли огромный мощный инструмент, 
а вывели на экран одну строчку. 
Очевидно, что фреймворк (сам nuxt и vue) вносят какой-то оверхед. 
А мы его не используем.

Но 345 kiB ?!

В nuxt есть замечательный инструмент для анализа бандла, 
основанный на [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer):

```bash
yarn nuxt build -a
```

![ba](pictures/bundle-analyze-with-blum.png)

Вот оно: __BalmUI__

##### UI библиотеки

И это огромная проблема: нам нужна библиотека, нам же лень делать базовые компоненты.

Тут первый вопрос которым стоит задаться: а можно ли не подключать библиотеку глобально, 
а использовать только то, что надо? Так, чтобы в бандл попадали только используемые зависимости?

Все зависит от используемой библиотеки, от того как она собирается... 
Сборщики пока еще не важно умеют в [tree-shaking](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)
Далеко не каждая библиотека позволяет это сделать,
наш BalmUI, например, нет (ну или я не нашел как это сделать).
Vuetify тоже не позволяет (ходят слухи, что это не так).

> Причем это касается не только сторонних библиотек, но и внутренних.
> При старте разработки библиотеки обратите на это особое внимание,
> помимо возможности подключения отдельного компонента,
> проверьте точно ли при подключении кнопочки не тянется вся библиотека целиком.

> Открыл статью "15 лучших UI библиотек для vue.js 2021", попробовал все...
> Ни одна не позволила подключить только кнопочку. 
> Пользователям react в этом плане попроще.

Если на первый вопрос ответ отрицательный, то есть второй вопрос: готовы ли мы платить за использование этой библиотеки?

Тут можно возразить, что на данном этапе код библиотеки на самом деле неиспользуемый, но по мере разработки все больше
и больше будет использоваться. Но это не так. Современные инструменты позволяют нам разделить код как минимум по
маршрутам. Nuxt это умеет делать из коробки. На странице будет использоваться вся UI библиотека? Навряд ли.

В итоге идем в конфиг, удаляем подключение библиотеки.
Подключим tailwind (стили все еще лень писать).

Снова запускаем анализ бандла, получаем такую картинку:
![ba2](pictures/bundle-alyze-init.png)

##### auto imports

Уже лучше, но что это в нижнем левом углу? Откуда тут `Tutorial.vue`? Мы же его не используем.
Дело в авто-импорте компонентов. 
Убираем это в конфиге `components: false,`

[Деплоим](https://ssr-optimize3.herokuapp.com/) и тестируем еще раз:

![ps-s3](page-speed-results/state3.png)

##### modern mode

Вроде 92 это не плохо, но не забываем, что у нас страница на которой только заголовок

- __Удалите неиспользуемый код JavaScript__ 33 KiB

Тут подходим к неочевидному моменту. А именно поддержка старых браузеров. 
Nuxt поддерживает браузеры начиная с IE9.
Соответственно код изобилует различными полифилами. 
Но, все не так плохо. В Nuxt есть опция modern, которая говорит 
'сделай мне два бандла — один для старых браузеров, второй для новых, 
и когда клиент придет, посмотри user-agent и отдай ему, что надо'.

Включаем эту волшебную штуку в конфиге `modern: true`

> это не только nuxt такой расчудесный. [Статья о modern](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)

[Деплоим](https://ssr-optimize4.herokuapp.com/). Тестируем еще раз:
![ps-s4](page-speed-results/state4.png)

Ну вот, 99, так-то лучше, только остались без UI либы.

### Итоги инициализации

- глобальные зависимости зло

- не забываем про modern

- выключаем auto-import

## Что наше супер приложение делает

Приложение представляет собой одну страницу из шапки и  10 секций 
(я их просто скопипастил, чтобы не выдумывать). 
Каждая показываем 10 карточек с товарами. 
Данные каждая секция запрашивает самостоятельно на бекенде 
(через axios запрашиваем json, который лежит в static) в методе fetch.
Так же на сервере (в nuxt server init) есть запрос за категориями,
из которых будем строить меню.
Респонсы взял у одного из крупнейших интернет-магазинов России.

>Для тех кто не пользовался nuxt:
> 
>У компонента есть метод для получения данных fetch, 
> который вызывается при первом рендере компонента 
> (неважно на сервере он происходит или на клиенте). 
> Если рендер происходит на сервере, 
> то данные запрашиваются, компонент рендерится (вставляется в документ), 
> на клиенте происходит гидротация этих данных.
> 
> Метод nuxtServerInit предназначен для инициализации сторы, 
> вызывается только на сервере, получает данные, складывает их в стору,
> на клиенте мы получаем предзаполненную стору.

## Первый запуск

И так, тестовый стенд [написан и задеплоен](https://ssr-optimize5.herokuapp.com/), 
смотрим что нам показывает page-speed:
![ps](page-speed-results/state5.png)

48. Рекомендации по устранению:

![ps60-rec](pictures/s5-recomendation.png)

Проблем мы с картинками и со сдвигом контента 
и способы их устранения общие для всех web-приложений, неважно на каких
технологиях сделан проект. Поэтому не буду подробно на них останавливаться, просто зачиним:

- все картинки переведем в webp;
- зададим размеры изображений для разных экранов (у нас один размер 375px);
- зададим размер верхнему изображению (что бы не было смещения при загрузке изображения);

Итог:
![ps78](page-speed-results/state6.png)

78... Кто-то может сказать, что 78 приемлемый результат. И это действительно так (перфекционистов в ад). 
Но у нас приложение, которое по сути не содержит ни какого функционала, 
ни какой интерактивности. В реальном приложении циферки
будут совсем другие.

Основная наша проблема кроется в метрике **Total Blocking Time** 720 мс

## Dynamic imports & lazyHydration

Чтобы понять, что происходит, давайте попробуем разобраться, что именно мы отдаем клиенту.

### Dynamic imports

Для начала обратимся к такой полезной фиче вебпака, 
[как разделение кода и волшебные комментарии](https://webpack.js.org/guides/code-splitting/). 
В компоненте страницы у
нас есть такие строчки:

```javascript
import CardList1 from "~/components/CardList/CardList1";
```

Здесь мы импортируем компонент для дальнейшего использования. Вынесем его в отдельный чанк:

```javascript
const CardList1 = () => import(/* webpackChunkName: "CardList1" */ '~/components/CardList/CardList1.vue')
```

Настоящая магия! Теперь запустив наше приложение и открыв devtools, увидим там, что мы грузим на клиент
файл `CardList1.1.f29585b.modern.js`. Этот файл содержит такой код:

```javascript
(window.webpackJsonp = window.webpackJsonp || []).push([[1], {
  206: function (t, e, r) {
    "use strict";
    r.r(e);
    var c = r(6)
      , o = {
      name: "CatCard1",
      props: {
        product: {
          type: Object,
          required: !0
        }
      }
    }
      , l = r(21)
      , n = {
      name: "CardList1",
      components: {
        CatCard: Object(l.a)(o, (function () {
            var t = this
              , e = t.$createElement
              , r = t._self._c || e;
            return r("div", {
              staticClass: "w-full bg-gray-900 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center"
            }, [r("div", {
              staticClass: "mb-8"
            }, [r("img", {
              staticClass: "object-center object-cover rounded-full h-36 w-36",
              attrs: {
                src: t.product.image,
                alt: "photo"
              }
            })]), t._v(" "), r("div", {
              staticClass: "text-center"
            }, [r("p", {
              staticClass: "text-xl text-white font-bold mb-2"
            }, [t._v(t._s(t.product.name))]), t._v(" "), r("p", {
              staticClass: "text-base text-gray-400 font-normal"
            }, [t._v(t._s(t.product.category.name))])])])
          }
        ), [], !1, null, "98db24cc", null).exports
      },
      props: {
        productsGroup: {
          type: Number,
          required: !0
        },
        title: {
          type: String,
          default: ""
        },
        description: {
          type: String,
          default: ""
        }
      },
      data: () => ({
        products: []
      }),
      fetch() {
        var t = this;
        return Object(c.a)((function* () {
            try {
              var e = yield t.$axios.$get("/api-mocks/products".concat(t.productsGroup, ".json"));
              t.products = e.body.products
            } catch (t) {
              console.log("CardList.fetch", t)
            }
          }
        ))()
      }
    }
      , d = Object(l.a)(n, (function () {
        var t = this
          , e = t.$createElement
          , r = t._self._c || e;
        return r("div", {
          staticClass: "w-full bg-gray-800"
        }, [r("section", {
          staticClass: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12"
        }, [t._m(0), t._v(" "), r("div", {
          staticClass: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }, t._l(t.products, (function (t) {
            return r("CatCard", {
              key: t.productId,
              attrs: {
                product: t
              }
            })
          }
        )), 1)])])
      }
    ), [function () {
      var t = this
        , e = t.$createElement
        , r = t._self._c || e;
      return r("div", {
        staticClass: "text-center pb-12"
      }, [r("h1", {
        staticClass: "font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white"
      }, [t._v("\n        CardList1\n      ")])])
    }
    ], !1, null, null, null);
    e.default = d.exports
  }
}]);
```

Читать машинно-сформированный код удовольствие так себе, но при взгляде становится понятно, что чанк содержит код нашего
компонента `CardList1`.

А что если он нам не нужен?

Как? А для чего же мы его писали?

Во-первых, есть компоненты, которые достаточно отрендерить один раз в виде html и больше ни когда не трогать. 
В нашем приложении все компоненты такие, т.е. они не будут меняться. 
Нам нужно отобразить их в документе и больше не трогать.

Во-вторых, для подавляющего количества компонентов верно следующее:
если в документе у нас есть разметка компонента, то код для него нам нужен не сразу
(либо не нужен вовсе, п.1), а при срабатывании различных триггеров — когда он попадает во вьюпорт,
пользователь где-то что-то нажал, или произошло другое событие...

Тут нам на помощь спешит недооцененная и изящная библиотека
[vue-lazy-hydration](https://github.com/maoberlehner/vue-lazy-hydration])

Она позволяет отложить гидротацию компонента.

Использование очень простое. Библиотека предоставляет компоненты, в которые оборачивается целевой компонент

```html

<LazyHydrate when-visible>
  <CardList10 :products-group="2"/>
</LazyHydrate>
```

Вставим в mounted компонента CardList10 console.log, запускаем проект, скролим вниз и видим, что наше сообщение
появляется не сразу, а когда компонент оказывается во вьюпорте.

Осталась маленькая проблема: компонент все еще грузится сразу, дело в том что код компонента `index` исполняется сразу,
и импорт дочерних компонентов происходит в момент рендера. Добавим обертку над целевым компонентом:

```vue

<template>
  <CardList10
    :products-group="productsGroup"/>
</template>

<script>
const CardList10 = () =>
  import(/* webpackChunkName: "CardList10" */ '~/components/CardList/CardList10.vue')

export default {
  name: "LazyCardList10",
  components: {CardList10},
  props: {
    productsGroup: {
      type: Number,
      required: true
    },
  },
}
</script>

```

Все равно грузится... беда! Происходит это из-за особенностей nuxt и сборки с флагом modern. К
счастью, [тут](https://github.com/vuejs/vue/issues/9847#issuecomment-626154095) есть решение. Уберем загрузку чанков из
документа.

Теперь загрузка компонентов CardList происходит в момент маунта компонента LazyCardList10, который в свою очередь
маунтится когда ему "разрешит" LazyHydration. Ставим всем компонентам на странице `LazyHydrate when-visible`

[Деплоим](https://ssr-optimize8.herokuapp.com/) и тестируем:

Дополнительно забыли о lazyloading изображений. Особо не мудрим и просто добавляем атрибут `loading="lazy"` к
изображениям

![ps](page-speed-results/5649fae8/mobile.png)

![ps-metrics](page-speed-results/5649fae8/mobile-metrics.png)

Ну вот уже зелененькие. Но помним, что у нас тестовый стенд, упрощенный по сравнению с реальными приложениями.

## Данные

Пришло время посмотреть на результат рендера страницы, т.е. на документ, который отдает нам сервер.

```html
<!doctype html>
<html data-n-head-ssr lang="en" data-n-head="%7B%22lang%22:%7B%22ssr%22:%22en%22%7D%7D">
<head>
  <title>ssr-optimize</title>
  <meta data-n-head="ssr" charset="utf-8">
  <meta data-n-head="ssr" name="viewport" content="width=device-width, initial-scale=1">
  <meta data-n-head="ssr" data-hid="description" name="description" content="">
  <meta data-n-head="ssr" name="format-detection" content="telephone=no">
  <link data-n-head="ssr" rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="preload" href="/_nuxt/modern-5c24fa509ceadba62ea6-app.js" as="script">
  <link rel="preload" href="/_nuxt/modern-0132d18578b8258d8277-commons/app.js" as="script">
  <link rel="preload" href="/_nuxt/modern-14af1aa6b1c6157916b2-app.js" as="script">
  <link rel="preload" href="/_nuxt/modern-c537fab69dd96158deb6-pages/index.js" as="script">
  <style
    data-vue-ssr-id="382a115c:0 0b721bb1:0 1af339ee:0">/*! tailwindcss v2.2.17 | MIT License | https://tailwindcss.com*/
  /* строка 16        */
  /*! modern-normalize v1.1.0 | MIT License | https://github.com/sindresorhus/modern-normalize */

  /*
  Document
========
*/

  /**
Use a better box model (opinionated).
*/

  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  /**
Use a more readable tab size (opinionated).
*/

  html {
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
  }

  /* ---------------- more css rows ---------------------------------- */
  .main-image {
    width: 375px;
    height: 375px
  }

  /*purgecss end ignore*/</style>
  <!--- строка 1082 ------------>
</head>
<body>
<div data-server-rendered="true" id="__nuxt"><!---->
  <div id="__layout">
    <div class="default-layout relative">

      <!----- more html rows ----------------------------------------------->

    </div>
  </div>
</div>
<!-- строка 2444-->
<script>
  window.__NUXT__ = (function (a, b, c, d, e, ...
  ..........)
  {
    return {
      layout: "default",
      data: [{}],
      fetch: {
        "CardList1:0": {
          products: [{
            productId: bb,
            name: dp,
            nameTranslit: dq,
            brandName: as,
            materialSource: n,
            productType: M,
            images: [dr, bc, ds, dt, du, dv, dw],
            vendorCatalog: a,
            partnerType: a,
            category: {id: at, name: ar},
            materialCisNumber: bb,
            description: a,
            modelName: dx,
            properties: {
              key: [{
                name: bd,
                priority: e,
                properties: [{
                  id: be,
                  name: bf,
                  value: bg,
                  nameDescription: a,
                  valueDescription: a,
                  priority: e,
                  measure: a
                }]
              }, {
                name: au,
                priority: t,
                properties: [{


  // Много похожего....

  //  строка 24660
</script>
<script src="/_nuxt/modern-5c24fa509ceadba62ea6-app.js" defer></script>
<script src="/_nuxt/modern-c537fab69dd96158deb6-pages/index.js" defer></script>
<script src="/_nuxt/modern-0132d18578b8258d8277-commons/app.js" defer></script>
<script src="/_nuxt/modern-14af1aa6b1c6157916b2-app.js" defer></script>
</body>
</html>

```

Структура нашего документа примерно такая:

- строки 16 - 1 084 стили

- строки 1084 - 2 444 разметка

- строки 2444 - __24 660__ - данные для гидротации

Что?! 22k строк данных для гидротации? Откуда?

Внимательно присмотревшись к структуре этого безобразия, можно увидеть строки типа:

```javascript
{
  layout: "default",
    data
:
  [{}],
    fetch
:
  {
    "CardList1:0"
  :
    {
      products: [{
        productId: bb,
        name: dp,
        nameTranslit: dq,
        brandName: as,
        materialSource: n,
        // и еще куча полей с вложенными данными
      }]
    }
  }
}
```

Это результаты наших фетчей. Так же можно найти и наши сторы с предзаполненными данными (помните, категории запрашивал?)

Т.е. происходит следующее:

- на сервере компонент запрашивает products

- получает json на 10к строк

- сохраняет это к себе в стору

- данные внедряются на страницу, что бы потом быть гидратированы

Зачем нам столько данных о товаре, если нам для отображения надо _name_, _category_, _image_ ?

Зачем нам столько пришло оставим на совести бекендеров.

Надо что-то с этим делать.

- есть модное решение __graphql__

- можно научить бекенд принимать фильтр с требуемыми полями `?fields="name,image,category.name"`

- ну и наконец, если один из первых двух вариантов не возможен, то количество гоняемых по сети данных оставим на совести
  бекендеров, а вот количество данных для гидротации снизим просто добавив мапер

В месте получения данных добавляем вызов мапера:

```javascript
export function mapApiProductsToProducts(productList) {
  return productList.map(product => ({
    name: product.name,
    category: product.category.name,
    image: product.image
  }))
}
```

Деплоимся, замеряем:

![ps96](page-speed-results/919c56a5/mobile96.png)

96. Ну почти... но все еще не 100.

Раз уж мы взялись смотреть на данные для гидротации,
давайте посмотрим на них еще раз.
Все еще много - у нас остался запрос за категориями. 
Напомню, это данные для построения выпадающего меню.

С одной стороны, для первого отображения они не нужны, 
и можно смело перенести этот запрос с сервера на клиент 
и запрашивать их при клике по бургеру. 
Но это ухудшит отзывчивость нашего интерфейса.

Можно не обращать на это внимания.
А можно разделить этот большой запрос на несколько этапов:

- на сервере запрашиваем только первый уровень меню
- при открытии меню запрашиваем остальное (или опять только следующий уровень)

Давайте посмотрим что нам это даст, 
причем даже не будем менять мок нашего бека, 
а поступим так же как с продуктами, т.е. смапим -
в стору положим только первый уровень каталога.

![ps98](page-speed-results/ccd535f0/mobile.png)
  
Для того чтобы было 100, надо уменьшить метрику LCP.


  
