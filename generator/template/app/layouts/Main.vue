<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  html() {
    return {
      title: '123',
      meta: [
        { mid: 'theme-color', name: 'theme-color', content: '#3e4095', },
      ],
    }
  },
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Raleway|Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i');

</style>
