<script lang="ts" setup>
import type { SelectHTMLAttributes } from 'vue';
import InputMsg from '../Alert/InputMsg.vue';

interface SelectProps extends SelectHTMLAttributes{
    label?: string,
    hint?: string,
    hintType?: 'error' | 'success' | 'warning' | 'none',
    class?: string
};

withDefaults(defineProps<SelectProps>(), {
    hintType: 'error'
});

</script>

<template>
<div class="mt-3" :class="class">
    <div>
        <label v-if="label" class="block mb-2 text-sm font-medium text-gray-900">{{label}}</label>
        <select
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            v-bind="$attrs">
            <slot></slot>
        </select>
    </div>
    <InputMsg v-if="hint" :type="hintType">{{hint}}</InputMsg>
</div>
</template>