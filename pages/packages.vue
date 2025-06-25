<template>
    <NeedScript />
    <ClientOnly>
        <v-tabs v-model="tab" grow>
            <v-tab value="version">
                <v-icon icon="mdi-list-box" start />
                Versions
                <v-chip
                    class="ma-2 hidden-xs"
                    label
                    size="small"
                    density="comfortable"
                    v-if="!loading.version"
                >
                    {{ pkgverlist.length }}
                </v-chip>
            </v-tab>
            <v-tab value="upgrade">
                <v-icon icon="mdi-alert-decagram" start />
                Upgrades
                <v-chip
                    class="ma-2 hidden-xs"
                    label
                    size="small"
                    density="comfortable"
                    v-if="!loading.update"
                >
                    {{ pkgupdatelist.length }}
                </v-chip>
            </v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
            <v-tabs-window-item value="version">
                <PackageVersionInfo
                    v-if="!loading.version && tab == 'version'"
                    :pkglist="pkgverlist"
                />
                <LoadingBar v-else />
            </v-tabs-window-item>
            <v-tabs-window-item value="upgrade">
                <PackageUpdateInfo
                    v-if="!loading.update && tab == 'upgrade'"
                    :pkglist="pkgupdatelist"
                />
                <LoadingBar v-else />
            </v-tabs-window-item>
        </v-tabs-window>
        <template #fallback>
            <LoadingBar />
        </template>
    </ClientOnly>
</template>

<script>
import axios from "axios";

export default {
    setup() {
        setPageMeta({
            title: "Packages",
            description:
                "Explore the software package list and detailed information of eweOS. Discover the latest updates, and find find everything needed in repository.",
        });
        definePageMeta({ title: "Packages" });
    },
    data: () => ({
        loading: {
            update: true,
            version: true,
        },
        pkgupdatelist: [],
        pkgverlist: [],
        tab: "version",
        repourl: "https://raw.githubusercontent.com/eweOS/workflow",
    }),
    created() {
        this.fetch_update();
        this.fetch_info();
    },
    methods: {
        fetch_update() {
            this.loading.update = true;
            axios
                .get(this.repourl + "/updatecheck/results.json")
                .then((resp) => {
                    this.pkgupdatelist = resp.data;
                    this.loading.update = false;
                    axios
                        .get(this.repourl + "/updatecheck/unconfigured.json")
                        .then((resp) => {
                            resp.data.forEach((pkg) => {
                                this.pkgupdatelist.push({
                                    name: pkg,
                                    status: "unconfigured",
                                });
                            });
                        });
                });
        },
        fetch_info() {
            this.loading.version = true;
            axios
                .get(this.repourl + "/pkginfo/pkginfo.json")
                .then((resp) => {
                    this.pkgverlist = resp.data;
                    this.loading.version = false;
                })
                .catch(() => {
                    this.pkgverlist = [];
                    this.loading.version = false;
                });
        },
    },
};
</script>
