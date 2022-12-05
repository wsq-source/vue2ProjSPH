<template>
 <div>
    <h2>params参数 {{$route.params.keyword}} {{keyword}}</h2>
    <h2>query参数 {{$route.query.k}} {{k}}</h2>
 </div>
</template>
 
<script>
export default {
    data() {
        return {
        }
    },
    props: ["keyword", "k"],
}
</script>

<style lang='css'>

</style>
