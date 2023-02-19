<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import InputMsg from '../Alert/InputMsg.vue';
import { gsapTL } from '@/helpers/ui';

interface TextInputProps {
    label?: string,
    placeholder?: string,
    hint?: string,
    hintType?: 'error' | 'success' | 'warning' | 'none',
    class?: string,
    fetcher: (keyword: string) => string[],
    modelValue?: string[]
};

const props = withDefaults(defineProps<TextInputProps>(), {
    type: 'text',
    hintType: 'error',
    class: 'text-gray-800 mt-3'
});

const emit = defineEmits(['update:modelValue']);

const tags = ref<string[]>(props.modelValue || []);
const allTags = ref<string[]>([]);
const listEL = ref<HTMLUListElement>();

const remove = (item: any) => {
    tags.value = tags.value.filter(v=>v != item);
    allTags.value.push(item);
    emit('update:modelValue', [...tags.value]);
}

const showList = () => {
    if(!listEL.value?.classList.contains('hidden')){
        return;
    }
    listEL.value.classList.remove('hidden');
    gsapTL()
    .timeScale(2)
    .fromTo(listEL.value, {height: 0}, {height: 'auto'})
    .then(()=>{
        listEL.value?.classList.add('overflow-y-auto');
    });
}

const addTag = (item: string) => {
    allTags.value = allTags.value.filter(it => it != item);
    tags.value.push(item);
    emit('update:modelValue', [...tags.value]);
}

const hideTags = ()=>{
    console.log('DOC Click');
    
    if(!listEL.value  || listEL.value.classList.contains('hidden')){
        return;
    }
    listEL.value.classList.remove('overflow-y-auto');
    gsapTL()
    .timeScale(3)
    .to(listEL.value, {height: 0}).then(()=>{
        listEL.value?.classList.add('hidden');
    })
};

onMounted(()=>{
    allTags.value = props.fetcher('');
    window.addEventListener('click', hideTags);
});

onUnmounted(()=>{
    window.removeEventListener('click', hideTags);
});

const search = (evt: any) => {
    const all = props.fetcher(evt.target.value);
    allTags.value = all.filter(tag=>tags.value.indexOf(tag) == -1);
}
</script>

<template>
    <div class="w-full relative" :class="class" @click.stop>
        <label v-if="label" class="block mb-2 text-sm font-medium">{{ label }}</label>
        <div class="flex flex-wrap bg-slate-50 rounded-lg p-2.5 border text-sm">
            <div
                v-for="item in tags"
                :data-id="item"
                class="bg-white px-1 py-px rounded-md mx-1 relative pr-6 tracking-wider shadow">
                {{ item }}
                <button
                    type="button"
                    class="absolute right-0 text-red-500 hover:bg-red-500 hover:text-white py-0 px-1.5 rounded-full"
                    @click="() => remove(item)">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <input
                type="text"
                class="px-1 py-0 m-0 border-0 flex-grow bg-transparent focus:outline-none"
                :placeholder="placeholder || label"
                @focus="showList"
                @input="search"
                />
        </div>
        <InputMsg v-if="hint" :type="hintType">{{ hint }}</InputMsg>
        <ul class="absolute top-full inset-x-0 shadow-lg rounded-lg mt-0.5 bg-white border max-h-96 hidden overflow-hidden" ref="listEL">
            <li v-if="allTags.length == 0">
                <p class="p-4 text-red-400">No item found that matches your query!</p>
            </li>
            <li v-else 
                v-for="item in allTags"
                class="border-b first:rounded-t-lg last:border-none">
                <button
                    type="button"
                    @click="addTag(item)"
                    class="px-4 py-3 cursor-pointer hover:bg-gray-100 w-full text-left">
                    {{ item }}
                </button>
            </li>
        </ul>
    </div>
</template>