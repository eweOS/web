<script lang="ts" setup>
const { data } = await useAsyncData("home", () =>
  queryContent("/").sort({ _id: -1 }).find()
);

const elementPerPage = ref(20);
const pageNumber = ref(1);

const formattedData = computed(() => {
  return data.value?.map(parseArticle) || [];
});

const paginatedData = computed(() => {
  return (
    formattedData.value.filter((data, idx) => {
      const startInd = (pageNumber.value - 1) * elementPerPage.value;
      const endInd = pageNumber.value * elementPerPage.value - 1;

      if (idx >= startInd && idx <= endInd) return true;
      else return false;
    }) || []
  );
});

const totalPage = computed(() => {
  const ttlContent = formattedData.value.length || 0;
  const totalPage = Math.ceil(ttlContent / elementPerPage.value);
  return totalPage;
});

setPageMeta({
  title: "Blog",
  description:
    "Stay up-to-date with the latest developments, insights, and news from the eweOS community. Our blog features articles on the development process, tutorials and user experiences.",
});
definePageMeta({ title: "Blog" });
</script>

<template>
  <div>
    <h1 class="mb-2"># Blog Posts</h1>
    <div class="d-flex flex-column align-center">
      <blog-item v-for="post in paginatedData" :key="post.title" :post="post" />
      <v-pagination
        v-model="pageNumber"
        :length="totalPage"
        :total-visible="5"
      ></v-pagination>
    </div>
  </div>
</template>

<!-- <template>
    <div class="flex justify-center items-center space-x-6 ">
      <button :disabled="pageNumber <= 1" @click="onPreviousPageClick">
        <Icon name="mdi:code-less-than" size="30" :class="{ 'text-sky-700 dark:text-sky-400': pageNumber > 1 }" />
      </button>
      <p>{{ pageNumber }} / {{ totalPage }}</p>
      <button :disabled="pageNumber >= totalPage" @click="onNextPageClick">
        <Icon name="mdi:code-greater-than" size="30" :class="{ 'text-sky-700 dark:text-sky-400': pageNumber < totalPage }" />
      </button>
    </div>
  </main>
</template> -->
