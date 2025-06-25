<template>
    <template v-for="row in rows" :key="row.arg">
        <v-row v-if="pkg[row.arg]">
            <v-col cols="4" lg="6" class="font-weight-bold">
                {{ row.desc ? row.desc : row.arg }}:
                <v-chip
                    v-if="row.isarr"
                    size="x-small"
                    :text="pkg[row.arg].length.toString()"
                />
            </v-col>
            <v-col cols="8" lg="6">
                <template v-if="row.isarr">
                    <template v-for="(it, idx) in pkg[row.arg]" :key="it">
                        <template v-if="idx < 3 || expandItems[row.arg]">
                            <span class="mr-1">
                                {{ it }}
                            </span>
                            <br v-if="pkg[row.arg].length > 1" />
                        </template>
                    </template>
                    <template
                        v-if="pkg[row.arg].length > 3 && !expandItems[row.arg]"
                    >
                        ...<br />
                    </template>
                    <v-chip
                        v-if="pkg[row.arg].length > 3"
                        size="x-small"
                        :text="
                            expandItems[row.arg]
                                ? 'Collapse'
                                : 'Expand' + `(+${pkg[row.arg].length - 3})`
                        "
                        @click="expandItems[row.arg] = !expandItems[row.arg]"
                    />
                </template>
                <template v-else>
                    <template v-if="row.arg === 'ISIZE' || row.arg === 'CSIZE'">
                        {{ humanFileSize(pkg[row.arg]) }}
                    </template>
                    <template v-else-if="row.arg === 'BUILDDATE'">
                        {{ new Date(pkg[row.arg] * 1000).toLocaleString() }}
                    </template>
                    <template v-else-if="row.arg === 'PACKAGER'">
                        {{ pkg[row.arg].replace(/ *<.*>/, "") }}
                    </template>
                    <template v-else>
                        <span>{{ pkg[row.arg] }}</span>
                    </template>
                </template>
            </v-col>
        </v-row>
    </template>
</template>

<script setup>
defineProps(["pkg", "rows"]);
const expandItems = ref({});
</script>
