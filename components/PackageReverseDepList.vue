<template>
    <v-card variant="outlined" class="mt-2">
        <v-row justify="space-between">
            <v-col cols="0">
                <v-card-subtitle class="mt-4 mb-2">
                    <v-icon start>mdi-graph</v-icon>
                    Reverse Dependencies
                    <v-chip
                        v-if="deptype_selected"
                        size="x-small"
                        :text="deppkgs.length.toString()"
                    />
                </v-card-subtitle>
            </v-col>
            <v-col>
                <v-select
                    v-model="deptype_selected"
                    :update:model-value="
                        loadfiles(arch, repo, deptype_selected)
                    "
                    :items="deptypes"
                    density="comfortable"
                    label="Select dependency"
                />
            </v-col>
        </v-row>
        <v-card-text>
            <template v-if="deppkgs.length > 0">
                <template v-for="(p, idx) in deppkgs" :key="p">
                    <template v-if="idx < 8 || expandItems">
                        <span class="mr-1">
                            {{ p }}
                        </span>
                        <br v-if="deppkgs.length > 1" />
                    </template>
                </template>
                <template v-if="deppkgs.length > 8 && !expandItems">
                    ...<br />
                </template>
                <v-chip
                    v-if="deppkgs.length > 8"
                    size="x-small"
                    :text="
                        expandItems
                            ? 'Collapse'
                            : 'Expand' + `(+${deppkgs.length - 8})`
                    "
                    @click="expandItems = !expandItems"
                />
            </template>
            <template v-else>
                <span v-if="deptype_selected">No package found!</span>
            </template>
        </v-card-text>
    </v-card>
</template>

<script setup>
const props = defineProps({
    arch: {
        type: String,
        required: false,
        default: "x86_64",
    },
    repo: {
        type: String,
        required: false,
        default: "main",
    },
    pkg: {
        type: String,
        required: true,
    },
});

const deptypes = ["MAKEDEPENDS", "DEPENDS", "CHECKDEPENDS"];
const deptype_selected = ref(null);
const loadfiles = async (arch, repo, deptype) => {
    expandItems.value = false;
    if (!deptype) return;
    if (deptype in deplist.value) return;
    return await $fetch(
        "https://raw.githubusercontent.com/eweOS/workflow/pkginfo-" +
            arch +
            "/" +
            repo +
            "/_" +
            deptype +
            ".json",
    )
        .then((data) => {
            deplist.value[deptype] = JSON.parse(data);
        })
        .catch((e) => {
            throw showError({
                statusCode: e.status,
                statusMessage: e.name,
                data: e.toString(),
            });
        });
};
const deplist = ref({});
const expandItems = ref(false);

const deppkgs = computed(() => {
    if (!(deptype_selected.value in deplist.value)) return [];
    return Object.keys(deplist.value[deptype_selected.value]).filter((k) =>
        deplist.value[deptype_selected.value][k].includes(props.pkg),
    );
});
</script>
