<template>
    <div>
        <!-- Sidebar -->
        <ul :class="{'toggled':store.isSidebarShow}" class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="#" @click="$router.push('/')">
                <div class="sidebar-brand-icon rotate-n-0">
                    <i class="fas fa-fw fa-user-astronaut"></i>
                    
                </div>
                <div class="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
            </a>

            
            <!-- Divider -->
            <hr class="sidebar-divider d-none d-md-block">

            <li v-for="(navItem, index) in menuList" :key="index" class="nav-item" :class="{active: currentRoute.meta.group == navItem.name}">
                
                <div v-if="navItem.items.length > 0">
                    <a class="nav-link" :class="{collapsed: !navItem.expand && currentRoute.meta.group != navItem.name}" href="javascript:;" data-toggle="collapse" role="button" :aria-expanded="navItem.expand" aria-controls="sidebar-products" @click.prevent="navItemCollapse(index)">
                        <i :class="navItem.icon"></i>
                        <span class="nav-link-text ml-1">{{navItem.name}}</span>
                    </a>
                </div>
                <div v-else>
                    <a class="nav-link" href="javascript:;" @click="$router.push(navItem.link)">
                        <i :class="navItem.icon"></i>
                    <span>{{navItem.name}}</span></a>
                </div>
                <div v-if="(navItem.items.length > 0 )" :class="[currentRoute.meta.group == navItem.name ? 'collapse show': navItem.expand ? 'collapse show' : 'collapse']">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <ul class="nav nav-sm flex-column">
                            <li v-for="(subItem, index) in navItem.items" :key="index">
                                <a href="javascript:;" @click="$router.push(subItem.link)" :class="[subItem.name == currentRoute.name ? 'collapse-item active':'collapse-item']">{{subItem.name}}</a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </li>
            <!-- Sidebar Toggler (Sidebar) -->
            <div class="text-center d-none d-md-inline">
                <button @click="toggleSidebar" class="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

            <!-- Sidebar Message -->
            <div class="sidebar-card d-none d-lg-flex">
                <img class="sidebar-card-illustration mb-2" src="/img/undraw_rocket.svg" alt="...">
                <p class="text-center mb-2"><strong>{{store.isSidebarShow}}</strong> is packed with premium features, components, and more!</p>
                <a class="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
            </div>

        </ul>
        <!-- End of Sidebar -->
    </div>
</template>

<script>
    import { computed, reactive } from 'vue'
    import { useRouter } from 'vue-router';
    import {useGlobalStore} from '@/store/global.store';
    export default {
        setup() {
            const store = useGlobalStore()
            const router = useRouter()
            let currentRoute = router.currentRoute.value
            
            let menuList = reactive([
                {
                    name: 'Dashboard',
                    icon: 'fas fa-fw fa-tachometer-alt',
                    expand: false,
                    link: '/',
                    items: []
                },
                {
                    name: 'Settings',
                    icon: 'fas fa-fw fa-cog',
                    expand: false,
                    items: [
                        {
                            name: 'Global',
                            link: '/settings/global'
                        },
                        {
                            name: 'Profile',
                            link: '/setting/profile'
                        }
                    ]
                }
            ])
            function navItemCollapse(index) {
                console.log(index)
                menuList = menuList.map((item, i) => {
                    item.expand = !item.expand
                    if(i !== index) {
                        item.expand = false
                    }
                    return item
                })
            }
            function toggleSidebar() {
                store.$patch((state) => {
                    state.isSidebarShow = !state.isSidebarShow
                    
                })

                // console.log(store.isSidebarShow)
            }

            
            return {
                navItemCollapse,
                toggleSidebar,
                store,
                menuList,
                currentRoute
            }
        }
    }
</script>