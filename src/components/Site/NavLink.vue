<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router';

interface Props {
    to: RouteLocationRaw
}
defineProps<Props>();
</script>
<template>
    <li>
        <RouterLink :to="to" v-slot="{ isActive }">
            <div class="block text-gray-700 rounded hover:text-blue-700" :class="{
                'text-blue-700': isActive
            }">
                <slot></slot>
            </div>
        </RouterLink>
    </li>
</template>