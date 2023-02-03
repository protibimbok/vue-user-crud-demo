<script lang="ts" setup>

interface TextAlertProps{
    onClose?: () => any,
    type: 'error' | 'success' | 'warning' | 'none',
    wrapperClass?: string
};

withDefaults(defineProps<TextAlertProps>(), {
    type: 'none'
});



</script>
<template>
    <div class="px-6 py-4 border-0 rounded relative mb-4 items-cente"
        :class="[{
            'text-red-800 bg-red-200':'error' == type,
            'text-yellow-900 bg-yellow-200':'warning' == type,
            'text-emerald-800 bg-emerald-200':'success' == type,
            'text-gray-800 bg-gray-400':'none' == type,
        }, wrapperClass]">
        <div class="inline-block align-middle text-lg mr-1" v-if="$slots.icon">
            <slot name="icon"></slot>
        </div>
        <div class="inline align-middle">
            <slot></slot>
        </div>
        <button
            type="button"
            v-if="onClose"
            @click="onClose"
            class="flex justify-center items-center absolute -right-2 -top-2 outline-none h-5 w-5 rounded-full text-xl text-white pb-1"
            :class="{
                'bg-red-800': 'error' == type,
                'bg-yellow-900': 'warning' == type,
                'bg-emerald-800': 'success' == type,
                'bg-gray-800': 'none' == type
            }">
            ×
        </button>
    </div>
</template>