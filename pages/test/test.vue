<template>
	<u-collapse :item-style="itemStyle" event-type="close" :arrow="arrow" :accordion="accordion" @change="change">
		<u-collapse-item :index="index" @change="itemChange" :title="item.head" v-for="(item, index) in itemList" :key="index">
			<view class="collapse-item">
				{{item.body}}
			</view>
		</u-collapse-item>
	</u-collapse>
</template>

<style scoped>
	.collapse-item {
		color: red;
		padding-bottom: 10px;
	}
</style>
