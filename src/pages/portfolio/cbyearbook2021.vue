<template>
  <div class=" flex flex-col min-w-[100%] px-6 prose items-center">
    <div class="text-black w-full lg:w-4/5">
      <h1 class="font-banner text-left" style="font-weight:normal;">
        CB Yearbook 2021
      </h1>
    </div>

    <div class="w-full lg:w-4/5">
      <div class="border-solid border-white border-width-6 p-[1rem] box">
        <video id="myVideo" muted loop controls style="margin:0">
          <source src="/projects/CBYearbook2021.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

  .box{
    --manip: 2px;
    border-width:3rem;
    background-color:#eee;
    box-shadow: inset calc( 1*var(--manip)) calc( 1*var(--manip)) calc( 3*var(--manip)) rgba(0,0,0,0.3), calc( 1*var(--manip)) calc( 1*var(--manip)) calc( 2*var(--manip)) rgba(0,0,0,0.2),
      calc( 3*var(--manip)) calc( 25*var(--manip)) calc( 55*var(--manip))  calc(-1*var(--manip)) rgba(0,0,0,0.3),  calc(-25*var(--manip))  calc(-25*var(--manip)) calc( 80*var(--manip))  calc(-15*var(--manip)) rgba(255, 255,255,0.9);
  }
</style>
