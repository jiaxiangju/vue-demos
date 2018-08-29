<template>
  <div class="header">
    <div class="content-wrapper">
    	<div class="avatar">
    		<img width="64" height="64" :src="seller.avatar">
    	</div>
    	<div class="content">
    		<div class="title">
    			<span class="brand"></span>
    			<span class="name">{{seller.name}}</span>
    		</div>
    		<div class="description">
    			{{seller.description}}/{{seller.deliveryTime}}分钟送达
    		</div>
    		<div v-if="seller.supports" class="supports">
    			<span class="icon" :class="classMap[seller.supports[0].type]"></span>
    			<span class="text">{{seller.supports[0].description}}</span>
    		</div>
    	</div>
    	<div v-if="seller.supports" class="supports-count" @click="showDetail">
    		<span class="count">{{seller.supports.length}}个</span>
    		<i class="icon-keyboard_arrow_right"></i>
    	</div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
    	<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    	<i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
    	<img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!-- 弹层 -->
    <transition name="fade"><!-- transition -->
	    <div v-show="detailShow" class="detail">
	    	<div class="detail-wrapper clearfix">
	    		<div class="detail-main">
	    			<h1 class="name">{{seller.name}}</h1>
	    			<div class="star-wrapper">
	    				<star :size="48" :score="seller.score"></star>    	
	    			</div>
	    			<line-center :text="'优惠信息'"/>
	    			<ul v-if="seller.supports" class="supports">
	    				<li class="support-item" v-for="item in seller.supports">
	    					<span class="icon" :class="classMap[item.type]"></span>
	    					<span class="text">{{item.description}}</span>

	    				</li>
	    			</ul>
	    			<line-center :text="'商家公告'"/>
	    			<div class="bulletin">
	    				<p class="content">{{seller.bulletin}}</p>
	    			</div>
	    		</div>
	    	</div>
	    	<div class="detail-close" @click="hideDetail">
	    		<i class="icon-close"></i>
	    	</div>
	    </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
	import star from '@/components/star/Star.vue';
	import lineCenter from '@/components/line/Line.vue';

export default{
	props: {
		seller: {
			type: Object
		}
	},
	data () {
		return {
			detailShow: false
		}
	},
	created () {
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
	},
	methods: {
		showDetail() {
			this.detailShow = true;
		},
		hideDetail () {
			this.detailShow = false;
		}
	},
	components: {
		star,
		lineCenter
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

	.clearfix{
		display: inline-block;
		&:after{
			display: block;
			content: '.';
			height: 0;
			line-height: 0;
			clear: both;
			visibility: hidden;
		}
	}

	.fade-enter-active, .fade-leave-active{
		transition: opacity .5s;
		background: rgba(7, 17, 27, 0.8);
	}
	.fade-enter, .fade-leave-to{
		opacity: 0;
		background: rgba(7, 17, 27, 0);
	}

	.header {
		color: #fff;
		background: rgba(7, 17, 27, 0.5);
		position: relative;
		overflow: hidden;
		.content-wrapper {
			position: relative;
			padding: 24px 12px 18px 24px;
			font-size: 0px;
			.avatar{
				display: inline-block;
				vertical-align: top;
				img{
					border-radius: 2px;
				}
			}
			.content{
				display: inline-block;
				margin-left: 16px;
				.title{
					margin: 2px 0 8px 0;
					.brand{
						display: inline-block;
						vertical-align: top;
						width: 30px;
						height: 18px;
						// background: url(brand@2x.png);
						@include background-pixel('brand');
						background-size:  30px 18px;
						background-repeat:  no-repeat;
					}
					.name{
						margin-left: 6px;
						font-size: 16px;
						line-height: 18px;
						font-weight: bold;
					}
				}
				.description{
					margin-bottom: 10px;
					line-height: 12px;
					font-size: 12px;
				}
				.supports{
					.icon{
						display: inline-block;
						vertical-align: top;
						width: 12px;
						height: 12px;
						margin-right: 4px;
						background-size: 12px 12px;
						background-repeat: no-repeat;
					}
					.icon.decrease{
						// background-image: url(decrease_1@2x.png);
						@include background-pixel('decrease_1');
					}
					.icon.guarantee{
						// background-image: url(guarantee_1@2x.png);
						@include background-pixel('guarantee_1');
					}
					.icon.discount{
						// background-image: url(discount_1@2x.png);
						@include background-pixel('discount_1');
					}
					.icon.invoice{
						// background-image: url(invoice_1@2x.png);
						@include background-pixel('invoice_1');
					}
					.icon.special{
						// background-image: url(special_1@2x.png);
						@include background-pixel('special_1');
					}
					.text{
						line-height: 12px;
						font-size: 10px;
					}
				}
			}
			.supports-count{
				position: absolute;
				right: 12px;
				bottom: 14px;
				padding: 0 8px;
				height: 24px;
				line-height: 24px;
				border-radius: 14px;
				background: rgba(0, 0, 0, 0.2);
				text-align: center;
				.count{
					font-size: 10px;
					vertical-align: top;
				}
				.icon-keyboard_arrow_right{
					font-size: 10px;
					line-height: 24px;
					margin-left: 2px;
				}
			}
		}
		.bulletin-wrapper{
			position: relative;
			height: 28px;
			line-height: 28px;
			padding: 0 22px 0 12px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			background: rgba(7, 17, 27, 0.2);
			.bulletin-title{
				display: inline-block;
				vertical-align: top;
				margin-top: 8px;
				width: 22px;
				height: 12px;
				// background-image: url(bulletin@2x.png);
				@include background-pixel('bulletin');
				background-size: 22px 12px;
				background-repeat: no-repeat;
			}
			.bulletin-text{
				font-size: 10px;
				margin: 0 4px;
				vertical-align: top;
			}
			.icon-keyboard_arrow_right{
				position: absolute;
				font-size: 10px;
				line-height: 12px;
				right: 12px;
				top: 8px;
			}
		}
		.background{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			filter: blur(10px);
		}
		.detail{
			position: fixed;
			z-index: 100;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			overflow: auto;
			backdrop-filter: blur(10px);//模糊效果
			background: rgba(7, 17, 27, 0.8);
			.detail-wrapper{
				min-height: 100%;
				width: 100%;
				.detail-main{
					margin-top: 64px;
					padding-bottom: 64px;
					.name{
						line-height: 16px;
						text-align: center;
						font-size: 16px;
						font-weight: 700;
					}
					.star-wrapper{
						margin-top:18px;
						padding: 2px 0;
						text-align: center;
					}
					.supports{
						width: 80%;
						margin: 0 auto;
						.support-item{
							padding: 0 12px;
							margin-bottom: 12px;
							font-size: 0;
							&:last-child{
								margin-bottom:0;
							}
							.icon{
								display: inline-block;
								width: 16px;
								height: 16px;
								vertical-align: top;
								margin-right: 6px;
								background-size: 16px;
								background-repeat:no-repeat;
							}
							.icon.decrease{
								@include background-pixel('decrease_2');
							}
							.icon.guarantee{
								@include background-pixel('guarantee_2');
							}
							.icon.discount{
								@include background-pixel('discount_2');
							}
							.icon.invoice{
								@include background-pixel('invoice_2');
							}
							.icon.special{
								@include background-pixel('special_2');
							}
							.text{
								line-height: 16px;
								font-size: 12px;
							}
						}
					}
					.bulletin{
						width: 80%;
						margin: 0 auto;
						.content{
							padding: 0 12px;
							line-height: 24px;
							font-size: 12px;
						}
					}
				}
			}
			.detail-close{
				position: relative;
				width: 32px;
				height: 32px;
				margin: -64px auto 0 auto;
				clear: both;
				font-size: 32px;
			}
		}
	}
</style>