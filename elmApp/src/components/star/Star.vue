<!-- 商家几颗星 -->
<template>
	<div class="star" :class="starType">
		<span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
	</div>
</template>

<script type="text/ecmascript-6">

	const LENGTH = 5;
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';

	export default{
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType() {
				return 'star-'+this.size;
			},
			itemClasses() {
				let result = [];
				let score = Math.floor(this.score*2) / 2;//向下0.5的值 
				let hasDecimal = score % 1 !== 0;//是否有半星
				let integer = Math.floor(score);//全星的个数
				for (let i = 0; i < integer; i++) {
					result.push(CLS_ON);
				}
				if (hasDecimal) {
					result.push(CLS_HALF);
				}
				while (result.length < LENGTH) {
					result.push(CLS_OFF);
				}
				return result;
			}
		}
	};
</script>

<style lang="scss">
	@mixin background-pixel($url) {
		background-image: url($url+'@2x.png');
		@media(-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
			background-image: url($url+'@3x.png');
		}
	}
	.star{
		font-size:0;
		.star-item{
			display: inline-block;
			background-repeat: no-repeat;
		}
		&.star-48{
			.star-item{
				width: 20px;
				height: 20px;
				margin-right: 22px;
				background-size: 20px 20px;
				&:last-child{
					margin-right: 0;
				}
				&.on{
					@include background-pixel('star48_on');
				}
				&.half{
					@include background-pixel('star48_half');
				}
				&.off{
					@include background-pixel('star48_off');
				}
			}
		}
		&.star-36{
			.star-item{
				width: 15px;
				height: 15px;
				margin-right: 6px;
				background-size: 15px 15px;
				&:last-child{
					margin-right: 0;
				}
				&.on{
					@include background-pixel('star36_on');
				}
				&.half{
					@include background-pixel('star36_half');
				}
				&.off{
					@include background-pixel('star36_off');
				}
			}
		}
		&.star-24{
			.star-item{
				width: 10px;
				height: 10px;
				margin-right: 3px;
				background-size: 10px 10px;
				&:last-child{
					margin-right: 0;
				}
				&.on{
					@include background-pixel('star24_on');
				}
				&.half{
					@include background-pixel('star24_half');
				}
				&.off{
					@include background-pixel('star24_off');
				}
			}
		}
	}
</style>