<template>
  <v-dialog max-width="700">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        variant="text"
        icon="mdi-chart-line"
        v-bind="activatorProps"
      >
      </v-btn>
    </template>

    <template v-slot:default="{}">
      <v-card title="Traffic Statistics" :subtitle="mirror.name">
        <v-card-text>
          <v-img
            v-for="period in periods"
            :key="period.keyword"
            :src="
              mirror.traffic_stats.url + '/vnstat_' + period.keyword + '.png'
            "
          />
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
const periods = [
  {
    keyword: "s",
    desc: "Summary",
  },
  {
    keyword: "5",
    desc: "5 Minutes",
  },
  {
    keyword: "h",
    desc: "Hourly",
  },
  {
    keyword: "d",
    desc: "Daily",
  },
  {
    keyword: "m",
    desc: "Monthly",
  },
  {
    keyword: "y",
    desc: "Yearly",
  },
  {
    keyword: "t",
    desc: "Top 25",
  },
];

const props = defineProps({
  mirror: { type: JSON, required: true },
});
</script>
