<template>
  <div class="consumptieRow">
    <div class="consumptie">
      <span class="consumptieName">
        {{ consumptieName }}
      </span>
      <a-form-model-item>
        <a-input-number
          :default-value="0"
          :min="0"
          :max="1000"
          :precision="0"
          @pressEnter="goToNextItem()"
          @change="updateAmount()"
          @focus="$event.target.select()"
        />
      </a-form-model-item>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Consumptie',
  props: ['consumptieName']
}
</script>
<style scoped>
.consumptieRow {
  display:flex;
  flex-wrap:none;
  align-items:center;
  justify-content:center;
}
.consumptieRow .consumptie {
  background-color:rgba(0, 0, 0, 0.5);
  color: white;
  max-width:200px;
  display:flex;
  flex-wrap:none;
  align-items:center;
  padding:5px 20px;
  border-radius:10px;
}
.consumptieRow .consumptieName {
  margin-right:20px;
}
.consumptieRow .ant-row {
  margin-bottom:0;
}
</style>
