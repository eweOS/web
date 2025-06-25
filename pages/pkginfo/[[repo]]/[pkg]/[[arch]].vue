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
            <PackageReverseDepList
                :arch="arch"
                repo="main"
                :pkg="route.params.pkg"
            />
            <PackageFileList
                :arch="arch"
                :repo="repo"
                :pkg="route.params.pkg"
            />
        </div>
    </div>
</template>

<script setup>
import PackageReverseDepList from "~/components/PackageReverseDepList.vue";

const route = useRoute();

const repo = route.params.repo || "main";
const arch = route.params.arch || "x86_64";

setPageMeta({
    title: "Package Info",
    description: `Package info for ${route.params.pkg} (${repo})`,
});
definePageMeta({ title: "Package Info" });

const pkg = ref(null);

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
        arg: "MAKEDEPENDS",
        desc: "Build Depends",
        isarr: true,
    },
    {
        arg: "CHECKDEPENDS",
        desc: "Check Depends",
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
        arch +
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
</script>
<style scoped>
a {
    color: unset;
}
</style>
