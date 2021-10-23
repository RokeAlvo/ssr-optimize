<template>
  <div>
    <h1>Очень нужное миру приложение</h1>
    <p>input value: <span>{{ input }}</span></p>
    <Field
      v-model="input"
      placeholder="placeholder"
    />
    <Button
      type="primary"
      icon="more"
      @click="onClick"
    >
      button
    </Button>
  </div>
</template>

<script>
import {Button, Field, Toast} from 'mint-ui';

export default {
  components: {Button, Field},
  data() {
    return {
      input: ''
    }
  },
  methods: {
    onClick() {
      Toast('button clicked')
    },
  }
}
</script>
