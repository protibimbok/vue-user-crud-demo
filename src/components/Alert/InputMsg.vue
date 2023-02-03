<script lang="ts" setup>
interface InputMsgProps{
    type: 'error' | 'success' | 'warning' | 'none'
}
withDefaults(defineProps<InputMsgProps>(), {
    type: 'none'
});

</script>
<template>
    <p class="text-xs font-normal leading-normal mt-0 mb-1"
        :class="{
            'text-red-500' : 'error' == type,
            'text-yellow-500' : 'warning' == type,
            'text-emerald-600' : 'success' == type,
            'text-gray-600' : 'none' == type
        }">
        <slot></slot>
    </p>
</template>