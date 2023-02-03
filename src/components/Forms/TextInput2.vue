<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue';
import InputMsg from '../Alert/InputMsg.vue';

interface TextInputProps extends InputHTMLAttributes {
    label?: string,
    placeholder?: string,
    hint?: string,
    hintType?: 'error' | 'success' | 'warning' | 'none',
    type?: string,
    class?: string
};

withDefaults(defineProps<TextInputProps>(), {
    type: 'text',
    hintType: 'error'
});

</script>

<template>
    <div class="w-full mt-3" :class="class">
        <label v-if="label" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
        <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            :placeholder="(placeholder || label)" v-bind="$attrs" :type="type">
        <InputMsg v-if="hint" :type="hintType">{{ hint }}</InputMsg>
    </div>
</template>