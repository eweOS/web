<template>
    <div>
        <NeedScript />
        <div class="d-flex flex-column">
            <h1 class="mb-2"># Package Info</h1>
            <v-card variant="outlined">
                <v-card-title>
                    <v-icon start>mdi-package</v-icon>
                    {{ pkg["NAME"] }}
                    <span class="font-weight-light"
                        >({{ pkg["VERSION"] }} / {{ pkg["ARCH"] }})</span
                    >
                </v-card-title>
                <v-card-text>
                    <PackageInfoList :pkg="pkg" :rows="pkgargs" />
                </v-card-text>
                <template v-if="'DEPENDS' in pkg">
                    <v-divider />
                    <v-card-text>
                        <PackageInfoList :pkg="pkg" :rows="pkgargs_rel" />
                    </v-card-text>
                </template>
            </v-card>

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
                        </v-card-subtitle>
                    </v-col>
                    <v-col cols="auto">
                        <v-switch
                            class="mr-4"
                            label="Treeified View"
                            v-model="treeified"
                            hide-details
                            inline
                        />
                    </v-col>
                </v-row>

                <template v-if="treeified">
                    <v-alert
                        :text="`File list too long, displaying first ${max_files} items`"
                        color="warning"
                        variant="outlined"
                        v-if="files.length > max_files"
                        class="ml-2 mr-2 mt-2"
                    />
                    <v-treeview
                        :items="treeify(files.slice(0, max_files))"
                        density="compact"
                        item-value="title"
                        open-on-click
                        open-all
                    >
                        <template v-slot:prepend="{ item, isOpen }">
                            <v-icon
                                v-if="item.children"
                                :icon="
                                    isOpen ? 'mdi-folder-open' : 'mdi-folder'
                                "
                            ></v-icon>
                            <v-icon v-else icon="mdi-file"></v-icon>
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
                @click="loadfiles"
                prepend-icon="mdi-file-multiple"
                text="Show list of files"
            />
        </div>
    </div>
</template>

<script setup>
import { VTreeview } from "vuetify/labs/VTreeview";
const route = useRoute();

const repo = route.params.repo || "main";

setPageMeta({
    title: "Package Info",
    description: `Package info for ${route.params.pkg} (${repo})`,
});
definePageMeta({ title: "Package Info" });

const pkg = ref(null);
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

const pkgargs = [
    {
        arg: "BASE",
        desc: "Base Package",
    },
    {
        arg: "REPO",
        desc: "Repository",
    },
    {
        arg: "DESC",
        desc: "Description",
    },
    {
        arg: "URL",
        desc: "Upstream URL",
    },
    {
        arg: "CSIZE",
        desc: "Package Size",
    },
    {
        arg: "ISIZE",
        desc: "Installed Size",
    },
    {
        arg: "BUILDDATE",
        desc: "Build Date",
    },
    {
        arg: "PACKAGER",
        desc: "Packager",
    },
    {
        arg: "LICENSE",
        desc: "Licenses",
        isarr: true,
    },
];
const pkgargs_rel = [
    {
        arg: "DEPENDS",
        desc: "Depends On",
        isarr: true,
    },
    {
        arg: "OPTDEPENDS",
        desc: "Optional Deps",
        isarr: true,
    },
    {
        arg: "CONFLICTS",
        desc: "Conflicts With",
        isarr: true,
    },
    {
        arg: "PROVIDES",
        desc: "Provides",
        isarr: true,
    },
    {
        arg: "REPLACES",
        desc: "Replaces",
        isarr: true,
    },
];

await $fetch(
    "https://raw.githubusercontent.com/eweOS/workflow/pkginfo-" +
        (route.params.arch || "x86_64") +
        "/" +
        repo +
        "/" +
        route.params.pkg +
        ".json",
)
    .then((data) => {
        pkg.value = JSON.parse(data);
    })
    .catch((e) => {
        throw showError({
            statusCode: e.status,
            statusMessage: e.name,
            data: e.toString(),
        });
    });

const loadfiles = async () => {
    return await $fetch(
        "https://raw.githubusercontent.com/eweOS/workflow/pkginfo-" +
            (route.params.arch || "x86_64") +
            "/" +
            repo +
            "/" +
            route.params.pkg +
            ".files.json",
    )
        .then((data) => {
            if (JSON.parse(data).length > max_files) treeified.value = false;
            files.value = JSON.parse(data);
        })
        .catch(() => {});
};
</script>
<style scoped>
a {
    color: unset;
}
</style>
