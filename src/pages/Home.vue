<script lang="ts" setup>
import Button1 from '@/components/Buttons/Button1.vue';
import { useSorter, getUsers, removeUser } from '@/helpers/crud';
import type { UserModel } from '@/types/model';
import { ref } from 'vue';

const users = ref<UserModel[]>(getUsers());
const [sorted, sortBy] = useSorter<string>('');
const sort = (by: string) => {
    sortBy(by);
    if(by == 'id'){
        if(sorted.value.order == 'asc'){
            users.value = getUsers();
        }else{
            users.value = getUsers().reverse();
        }
        return;
    }
    if(sorted.value.order == 'asc'){
        //@ts-ignore
        users.value.sort((a: any, b: any)=>{
            if(a[by] < b[by]){
                return -1;
            }
            if(a[by] == b[by]){
                return 0;
            }
            if(a[by] > b[by]){
                return 1;
            }
        })
    }else{
        //@ts-ignore
        users.value.sort((a: any, b: any)=>{
            if(a[by] > b[by]){
                return -1;
            }
            if(a[by] == b[by]){
                return 0;
            }
            if(a[by] < b[by]){
                return 1;
            }
        })
    }
}
const remove = (idx: number) => {
    removeUser(idx);
    users.value.splice(idx, 1);
}
</script>
<template>
    <section class="bg-white mx-4 lg:mx-auto max-w-6xl rounded-lg border mt-10 overflow-hidden shadow-lg shadow-blue-200">
        <div class="block w-full overflow-x-auto text-slate-500">
            <div class="flex items-center px-4 py-4 justify-between">
                <h3 class="font-bold text-lg text-slate-600">Registered users list</h3>
                <RouterLink to="/register">
                    <Button1>
                        <i class="fas fa-add mr-1"></i>ADD
                    </Button1>
                </RouterLink>
            </div>
            <table class="items-center w-full bg-transparent border-collapse">
                <col class="w-20"><col/> <col /> <col/><col/> <col class="w-6"/>
                <thead>
                    <tr class="text-xs uppercase font-semibold bg-slate-50">
                        <th
                            class="px-6 align-middle border border-solid py-3 border-l-0 border-r-0 whitespace-nowrap text-left border-slate-100 sortable"
                            :class="{[sorted.order]:sorted.by === 'id'}"
                            @click="sort('id')">
                            No.
                        </th>
                        <th
                            class="px-6 align-middle border border-solid py-3 border-l-0 border-r-0 whitespace-nowrap text-left border-slate-100 sortable"
                            :class="{[sorted.order]:sorted.by === 'name'}"
                            @click="sort('name')">
                            Name
                        </th>
                        <th
                            class="px-6 align-middle border border-solid py-3 border-l-0 border-r-0 whitespace-nowrap text-left border-slate-100 sortable"
                            :class="{[sorted.order]:sorted.by === 'email'}"
                            @click="sort('email')">
                            Email
                        </th>
                        <th
                            class="px-6 align-middle border border-solid py-3 border-l-0 border-r-0 whitespace-nowrap text-left border-slate-100">
                            Profession
                        </th>
                        <th
                            class="px-6 align-middle border border-solid py-3 border-l-0 border-r-0 whitespace-nowrap text-left border-slate-100">
                            Uses
                        </th>
                        <th
                            class="px-6 align-middle border border-solid py-3 border-l-0 border-r-0 whitespace-nowrap text-left border-slate-100">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="users.length == 0">
                        <td colspan="5">
                            <p class="p-4 font-semibold text-red-500">No user is added!</p>
                        </td>
                    </tr>
                    <tr v-else v-for="(user, idx) in users" class="border-b">
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 p-4">
                            {{ idx + 1}}
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 p-4">
                            {{user.name}}
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 p-4">
                            {{user.email}}
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 p-4 uppercase">
                            {{user.profession || 'N/A'}}
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 p-4">
                            {{user.uses?.join(', ') || 'N/A'}}
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 p-4">
                            <button
                                class="text-red-400 hover:text-red-600"
                                @click="remove(idx)">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>