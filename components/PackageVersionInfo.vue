<template>
    <v-row class="mt-4">
        <v-col cols="12" md="6">
            <v-select
                label="Select Architecture"
                variant="outlined"
                density="compact"
                v-model="enabled_archs"
                :items="archs"
                hide-details
                single-line
                multiple
            ></v-select>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field
                v-model="filterkey"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="compact"
                hide-details
                single-line
            ></v-text-field>
        </v-col>
    </v-row>
    <VDataTableVirtual
        sticky
        :headers="headers"
        :items="pkglist"
        :height="height"
        :search="filterkey"
        fixed-header
    >
        <template v-slot:[`item.NAME`]="{ item }">
            <v-chip
                variant="text"
                :to="'/pkginfo/' + item.REPO + '/' + item.NAME"
            >
                <b v-if="item.REPO === 'main'">
                    {{ item.NAME }}
                </b>
                <template v-else>
                    {{ item.REPO }}&nbsp; / &nbsp;
                    <b> {{ item.NAME }}</b>
                </template>
            </v-chip>
        </template>
        <template
            v-for="arch in archs"
            :key="arch"
            v-slot:[`item.pkgdata-`+arch]="{ item }"
        >
            <v-chip
                class="mx-1 my-1 version-chip"
                prepend-icon="mdi-package"
                :color="is_max_ver(arch, item.ARCH) ? 'success' : 'warning'"
                v-if="item.ARCH?.[arch]"
                :to="'/pkginfo/' + item.REPO + '/' + item.NAME + '/' + arch"
            >
                {{ item.ARCH[arch].VERSION }}
            </v-chip>
            <v-chip
                class="mx-1 my-1"
                prepend-icon="mdi-null"
                color="grey"
                v-else
            >
                NULL
            </v-chip>
        </template>
    </VDataTableVirtual>
</template>

<script>
import moment from "moment";

export default {
    props: ["pkglist"],
    methods: {
        maxstr(arr) {
            return arr.reduce(
                (a, v) => {
                    a.min =
                        a.min === null
                            ? v
                            : v.localeCompare(a.min) < 0
                              ? v
                              : a.min;
                    a.max =
                        a.max === null
                            ? v
                            : v.localeCompare(a.max) > 0
                              ? v
                              : a.max;
                    return a;
                },
                { min: null, max: null },
            );
        },
        is_max_ver(arch, data) {
            if (
                data[arch].VERSION ===
                this.maxstr(Object.values(data).map((i) => i.VERSION)).max
            )
                return true;
            return false;
        },
    },
    computed: {
        height() {
            if (window.innerHeight > 800) return window.innerHeight - 320;
            else return window.innerHeight;
        },
        headers() {
            let ret = [
                {
                    title: "Package Name",
                    key: "NAME",
                    sortable: true,
                },
            ];
            this.enabled_archs.forEach((arch) => {
                ret.push({
                    title: arch + " Status",
                    key: "pkgdata-" + arch,
                    sortable: false,
                });
            });
            return ret;
        },
    },
    data: () => ({
        moment: moment,
        archs: ["x86_64", "aarch64", "riscv64", "loongarch64"],
        enabled_archs: ["x86_64", "aarch64", "riscv64", "loongarch64"],
        filterkey: null,
    }),
};
</script>

<style scoped>
.v-chip {
    user-select: text;
}
.v-chip.version-chip {
    max-width: 150px;
}
.v-chip.version-chip:hover {
    max-width: unset;
}
</style>
