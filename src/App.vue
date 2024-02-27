<template>
    <router-view></router-view>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"

onMounted(() => {
    const test = "test"
    console.log(test, "test")
})
</script>

<style></style>
