<template>
<div class="vertical-border-end">
  <div class="border morning"></div>
  <div class="border afternoon"></div>
  <div class="border evening"></div>
  <div class="border night"></div>
</div>
</template>
<style lang="scss">
.vertical-border-end{
  height: 258px;

  .border{
    height: 25%;
    width: 100%;
  }

  .morning{
    background: #e0ce28;
  }
  .afternoon{
    background: #f69f19;
  }
  .evening{
    background: #257b84;
  }
  .night{
    background: #f27781;
  }
}

@media(max-width: 633px){
  .vertical-border-end{
    height: 251px !important;
  }
}
</style>
<script>
export default {
}
</script>
