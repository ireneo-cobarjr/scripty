<script setup lang="ts">
interface Scripty {
  id: string | number;
  title: string;
  description: string;
  code: string;
  evaluation: any;
  userId: string | number;
}

interface Props {
  scripty: Scripty;
}

const props = defineProps<Props>();

const router = useRouter();

const edit = () => {
  router.push(`/scripty/${props.scripty.id}`);
};
</script>

<template>
  <div class="scripty-card shadow" @click="edit">
    <div class="bg-primary padded">
      <span class="text-white bold">
        {{ scripty.title }}
      </span>
    </div>
    <div class="padded">
      {{
        scripty.description.length > 46
          ? `${scripty.description.slice(0, 40)}...`
          : scripty.description
      }}
    </div>
    <div class="italic padded">
      {{
        ` - "${scripty.evaluation.performance.eval.length > 135 ? `${scripty.evaluation.performance.eval.slice(0, 130)}...` : scripty.evaluation.performance.eval}"`
      }}
    </div>
    <div class="padded">
      <div id="eval">
        <NuxtRating
          :read-only="true"
          :rating-value="scripty.evaluation.performance.rating"
        />
        <div class="italic">
          {{ scripty.evaluation.performance.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.scripty-card {
  width: 377px;
  height: 236px;
  cursor: pointer;
}

#eval {
  display: flex;
  justify-content: space-between;
}
</style>
