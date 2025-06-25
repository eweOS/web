<template>
    <v-card v-if="files" variant="outlined" class="mt-2">
        <v-row justify="space-between">
            <v-col cols="auto">
                <v-card-subtitle class="mt-4 mb-2">
                    <v-icon start>mdi-file-multiple</v-icon>
                    File List
                    <v-chip
                        class="ml-2"
                        size="small"
                        :text="
                            files.length > max_files
                                ? `${max_files}+`
                                : files.length
                        "
                    />
                    <v-btn
                        class="ml-2"
                        size="small"
                        variant="outlined"
                        text="Hide"
                        @click="files = null"
                    />
                </v-card-subtitle>
            </v-col>
            <v-col cols="auto">
                <v-switch
                    v-model="treeified"
                    class="mr-4"
                    label="Treeified View"
                    hide-details
                    inline
                />
            </v-col>
        </v-row>

        <template v-if="treeified">
            <v-alert
                v-if="files.length > max_files"
                :text="`File list too long, displaying first ${max_files} items`"
                color="warning"
                variant="outlined"
                class="ml-2 mr-2 mt-2"
            />
            <v-treeview
                :items="treeify(files.slice(0, max_files))"
                density="compact"
                item-value="title"
                open-on-click
                open-all
            >
                <template #prepend="{ item, isOpen }">
                    <v-icon
                        v-if="item.children"
                        :icon="isOpen ? 'mdi-folder-open' : 'mdi-folder'"
                    />
                    <v-icon v-else icon="mdi-file" />
                </template>
            </v-treeview>
        </template>
        <template v-else>
            <v-card-text>
                <p v-for="item in files" :key="item">{{ item }}</p>
            </v-card-text>
        </template>
    </v-card>

    <v-btn
        v-else
        class="mt-2"
        block
        variant="outlined"
        prepend-icon="mdi-file-multiple"
        text="Show list of files"
        @click="loadfiles(arch, repo, pkg)"
    />
</template>

<script setup>
import { VTreeview } from "vuetify/labs/VTreeview";
defineProps({
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

const files = ref(null);
const treeified = ref(true);
const max_files = 500;

const treeify = (paths) => {
    const tree = [];

    for (const path of paths) {
        const parts = path.split("/").filter((part) => part !== ""); // Split path and remove empty parts
        let currentLevel = tree;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const isLastPart = i === parts.length - 1;

            const existingNode = currentLevel.find(
                (node) => node.title === part,
            );

            if (existingNode) {
                // Node exists, move to its children level
                if (!existingNode.children && !isLastPart) {
                    existingNode.children = []; // Prepare for children if it's a directory
                }
                if (existingNode.children) {
                    currentLevel = existingNode.children;
                } else {
                    // If it's a file at the end, no children to move into
                }
            } else {
                // Node doesn't exist, create a new one
                const newNode = { title: part };
                if (!isLastPart) {
                    newNode.children = []; // Prepare for children if it's a directory
                }
                currentLevel.push(newNode);
                if (newNode.children) {
                    currentLevel = newNode.children;
                } else {
                    // If it's a file at the end, no children to move into
                }
            }
        }
    }

    return tree;
};

const loadfiles = async (arch, repo, pkg) => {
    return await $fetch(
        "https://raw.githubusercontent.com/eweOS/workflow/pkginfo-" +
            arch +
            "/" +
            repo +
            "/" +
            pkg +
            ".files.json",
    )
        .then((data) => {
            if (JSON.parse(data).length > max_files) treeified.value = false;
            files.value = JSON.parse(data);
        })
        .catch(() => {});
};
</script>
