<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="seller.serviceScore"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<star :size="36" :score="seller.foodScore"></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect @ratingtype-select="_ratingTypeSelect" @content-toggle="_contentToggle" :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
						<div class="avatar">
							<img width="28px" :src="rating.avatar">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
								<p class="text">{{rating.text}}</p>
								<div class="recommend" v-show="rating.recommend && rating.recommend.length">
									<span class="icon-thumb_up"></span>
									<span v-for="recommend in rating.recommend" class="text">{{recommend}}</span>
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import star from '@/components/star/Star';
	import split from '@/components/split/split';
	import ratingselect from '@/components/ratingselect/ratingselect';
	import {formatDate} from '@/common/js/date';
	import BScroll from "better-scroll";
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	const ERR_OK = 0;
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: true
			}
		},
		created() {
			this.$http.get('/ratings').then((res) => {
				res = res.body;
				if (res.errno === ERR_OK) {
					this.ratings = res.data;
					this.$nextTick(() => {
						this.scroll = new BScroll(this.$refs.ratings, {
							click: true
						});
					});
				}
			});
		},
		methods: {
			needShow(type, text) {
				if (this.onlyContent && !text) {
					return false;
				}
				if (this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			},
			_contentToggle(onlyContent) {
				this.onlyContent = onlyContent;
			},
			_ratingTypeSelect(type) {
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			}
		},
		filters: {
			formatDate(time) {
				var date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		components: {
			star,
			split,
			ratingselect
		}
	};
</script>
<style lang="scss" scoped>
	.ratings{
		position: absolute;
		top: 174px;
		bottom: 0;
		width: 100%;
		left: 0;
		overflow: hidden;
		.overview{
			display: flex;
			padding: 18px 0;
			.overview-left{
				flex: 0 0 137px;
				width: 137px;
				border-right: 1px solid rgba(7, 17, 27, 0.2);
				text-align: center;
				padding: 6px 0;
				@media only screen and (max-width: 320px){
				  flex: 0 0 120px;
				  width: 120px;
				}
				.score{
					margin-bottom: 6px;
					line-height: 28px;
					font-size: 24px;
					color: rgb(255, 153, 0);
				}
				.title{
					margin-bottom: 8px;
					font-size: 12px;
					line-height: 12px;
					color: rgb(7, 17, 27);
				}
				.rank{
					font-size: 10px;
					line-height: 10px;
					color: rgb(147, 153, 159);
				}
			}
			.overview-right{
				flex: 1;
				padding: 6px 0 6px 24px;
				@media only screen and (max-width: 320px){
				  padding-left: 6px;
				}
				.score-wrapper{
					margin-bottom: 8px;
					font-size: 0;
					.title{
						display: inline-block;
						line-height: 18px;
						font-size: 12px;
						color: rgb(7, 17, 27);
					}
					.star{
						display: inline-block;
						vertical-align: top;
						margin: 0 12px;
					}
					.score{
						display: inline-block;
						line-height: 18px;
						font-size: 12px;
						vertical-align: top;
						color: rgb(255, 153, 0)
					}
				}
				.delivery-wrapper{
					font-size: 0;
					.title{
						line-height: 18px;
						font-size: 12px;
						color: rgb(7, 17, 27);
					}
					.delivery{
						margin-left: 12px;
						font-size: 12px;
						color: rgb(147, 153, 159);
					}
				}
			}
		}
		.rating-wrapper{
			padding: 0 18px;
			.rating-item{
				display: flex;
				padding: 18px 0;
				border-bottom: 1px solid rgba(7, 17, 27, 0.2);
				.avatar{
					flex: 0 0 28px;
					width: 28px;
					margin-right: 12px;
					img{
						border-radius: 50%;
					}
				}
				.content{
					position: relative;
					flex: 1;
					.name{
						line-height: 12px;
						font-size: 10px;
						color: rgb(7, 17, 27);
						margin-bottom: 4px;
					}
					.star-wrapper{
						margin-bottom: 6px;
						font-size: 0;
						.star{
							display: inline-block;
							vertical-align: top;
							margin-right: 6px;
						}
						.delivery{
							display: inline-block;
							vertical-align: top;
							font-size: 10px;
							line-height: 12px;
							color: rgb(147, 153, 159);
						}
						.text{
							line-height: 18px;
							font-size: 12px;
							margin-bottom:8px;
							color: rgb(7, 17, 27);
						}
						.recommend{
							line-height: 10px;
							font-size: 0;
							.icon-thumb_up,.text{
								display: inline-block;
								margin-right: 8px;
								margin-bottom: 4px;
								font-size: 9px;
								
							}
							.icon-thumb_up{
								color: rgb(0, 160,220);
							}
							.text{
								padding: 0 6px;
								border: 1px solid rgba(7, 17, 27, 0.1);
								border-radius: 1px;
								color: rgb(147, 153, 159);
								background: #fff;

							}
						}
						.time{
							position: absolute;
							top: 0;
							right: 0;
							line-height: 12px;
							font-size: 10px;
							color: rgb(147, 153, 159);
						}
					}
				}
			}
		}
	}
	
</style>