<template>
  <div>
    <div class="d-flex flex-column">
      <h1 class="mb-2"># Download and Install</h1>
      <p>
        Since we follow the rolling release model, you can download a copy of
        eweOS bootable image daily builds below, and burn it to a CD or write to
        a USB drive.
        <br />
        You can follow the installation guide from
        <a href="https://os-wiki.ewe.moe">wiki</a> to install eweOS to your
        machine.
      </p>

      <h2 class="mt-2">Supported Platforms</h2>
      <v-alert class="my-2" rounded="lg">
        <p>
          <b>Tier-0 Platforms:</b><br />
          x86_64
        </p>
        <p>
          <b>Tier-1 Platforms:</b><br />
          aarch64, riscv64, loongarch64
        </p>
      </v-alert>

      <h2 class="mt-2">Community Mirrors</h2>
      <v-list two-lines>
        <v-divider />
        <template v-for="mirror in mirrors" :key="mirror.id">
          <mirror-item :mirror="mirror" />
          <v-divider />
        </template>
        <v-list-item disabled>
          <v-list-item-title> More mirrors soon&trade;... </v-list-item-title>
          <v-list-item-subtitle>
            Contact us if you want to add your mirror to our list.
          </v-list-item-subtitle>
        </v-list-item>
        <v-divider />
      </v-list>

      <h2 class="mt-2">Official Mirrors</h2>
      <v-list two-lines>
        <v-divider />
        <template v-for="mirror in official_mirrors" :key="mirror.id">
          <mirror-item :mirror="mirror" />
          <v-divider />
        </template>
      </v-list>

      <h2 class="mt-2">GitHub Workflows</h2>
      <v-list two-lines>
        <v-divider />
        <v-list-item>
          <v-list-item-title> Image Creation </v-list-item-title>
          <v-list-item-subtitle>
            <v-chip
              class="mr-2"
              outlined
              size="x-small"
              variant="outlined"
              label
              >Official</v-chip
            >
            <v-chip
              class="mr-2"
              outlined
              size="x-small"
              variant="outlined"
              label
              >Daily</v-chip
            >
          </v-list-item-subtitle>
          <template v-slot:append>
            <img
              height="24"
              src="https://img.shields.io/github/actions/workflow/status/eweOS/iso/publish_iso.yml?style=for-the-badge&logo=github&label=ISO"
            />
            <v-btn
              href="https://github.com/eweOS/iso/actions/workflows/publish_iso.yml"
              variant="text"
              icon="mdi-cog-box"
            ></v-btn>
          </template>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-list-item-title>
            Docker Image (<code>ghcr.io/eweos/docker</code>)
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-chip
              class="mr-2"
              outlined
              size="x-small"
              variant="outlined"
              label
              >Official</v-chip
            >
            <v-chip
              class="mr-2"
              outlined
              size="x-small"
              variant="outlined"
              label
              >Daily</v-chip
            >
          </v-list-item-subtitle>
          <template v-slot:append>
            <img
              height="24"
              src="https://img.shields.io/github/actions/workflow/status/eweOS/docker/docker-publish.yml?style=for-the-badge&logo=github&label=Docker"
            />
            <v-btn
              href="https://github.com/eweOS/docker/actions/workflows/docker-publish.yml"
              variant="text"
              icon="mdi-docker"
            ></v-btn>
          </template>
        </v-list-item>
        <v-divider />
      </v-list>

      <h2 class="mt-2">Build Your Own Image</h2>
      <p>
        Want to build your own image and get fully customized experience? Please
        checkout at <a href="http://os-wiki.ewe.moe">our wiki</a> and
        <a href="https://github.com/eweOS/iso">scripts</a>.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import mirrors from "~/assets/mirrors.json";
import official_mirrors from "~/assets/official_mirrors.json";

setPageMeta({
  title: "Download",
  description:
    "Download eweOS images and install it on your devices. Explore mirrors with weekly builds, daily builds and Docker images.",
});
definePageMeta({ title: "Download" });
</script>
