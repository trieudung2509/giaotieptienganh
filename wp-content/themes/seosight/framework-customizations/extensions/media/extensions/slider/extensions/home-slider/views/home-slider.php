<?php if ( isset( $data['slides'] ) ):

	global $allowedtags;

	$attributes      = array();
	$autoplay        = seosight_akg( 'settings/extra/autoplay', $data, 0 );
	$full_height     = seosight_akg( 'settings/extra/full_height', $data, 'off' );
	$slide_labels    = seosight_akg( 'settings/extra/slide_labels', $data, 'on' );
	$slide_arrows    = seosight_akg( 'settings/extra/slide_arrows', $data, 'on' );
	$slider_infinity = seosight_akg( 'settings/extra/slider_infinity', $data, 'on' );
	$stop_on_hover   = seosight_akg( 'settings/extra/stop_on_hover', $data, 'off' );

	$attributes[] = 'data-stop-on-hover="' . $stop_on_hover . '"';

	if ( 0 !== $autoplay ) {
		$attributes[] = 'data-autoplay="' . esc_attr( $autoplay * 1000 ) . '"';
	}
	if ( 'off' === $slider_infinity ) {
		$attributes[] = 'data-loop="false"';
	}
	$additional_class = 'on' === $full_height ? 'js-full-window' : '';
	$additional_class .= 'off' === $slide_labels ? ' no-labels' : '';

	?>

    <div class="crumina-module crumina-module-slider">
        <div class="swiper-container main-slider <?php echo esc_attr( $additional_class ); ?>"
             data-effect="fade" data-parallax="true" data-show-items="1" data-change-handler="thumbsParent"
             data-prev-next="1" <?php echo implode( ' ', $attributes ); ?>>

            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
                <!-- Slides -->
				<?php foreach ( $data['slides'] as $slide ) {
					$bg_color     = seosight_akg( 'extra/bg-color', $slide, '#f7f9f9' );
					$title        = seosight_akg( 'title', $slide, '' );
					$subtitle     = seosight_akg( 'desc', $slide, '' );
					$image_layout = seosight_akg( 'extra/image_layout', $slide, 'content' );
					$align        = seosight_akg( 'extra/text-align', $slide, '' );
					$slide_class  = 'dark' === seosight_akg( 'extra/text-color', $slide, 'dark' ) ? 'main-slider-bg-light' : 'main-slider-bg-dark';
					$buttons      = seosight_akg( 'extra/buttons', $slide, array() );
					$slide_class  .= 'alignright' === $align ? ' thumb-left' : '';

					$column_class = ( 'center' === $align || ! isset( $slide['attachment_id'] ) || empty( $slide['attachment_id'] ) ) ? 'slider-content-fullwidth align-center' : 'slider-content-half-width ';

					$subtitle_tag = 'h5';

					if ( 'background' === $image_layout ) {
						$bg_image     = wp_get_attachment_image_url( $slide['attachment_id'], 'full' );
						$slide_style  = 'background-image:url(' . esc_attr( $bg_image ) . ')';
						$overlay_html = '<div class="overlay" style="background-color:' . esc_attr( $bg_color ) . '; opacity:0.3"></div>';
					} else {
						$slide_style  = 'background-color: ' . esc_attr( $bg_color ) . '';
						$overlay_html = '';
					}


					?>
                    <!-- Slides -->

                    <div class="swiper-slide <?php echo esc_attr( $slide_class ) ?>"
                         style="<?php seosight_render( $slide_style ) ?>">
						<?php
						seosight_render( $overlay_html );
						$container_class = preg_match( '/slider\-content\-fullwidth/', $column_class ) ? 'd-flex-column' : '';
						?>
                        <div class="container d-flex full-height <?php echo esc_attr( $container_class ); ?>">
                            <div class="slider-content  <?php echo esc_attr( $column_class ) ?>">
								<?php if ( ! empty( $title ) ) { ?>
                                    <div class="slider-content-title h1"
                                         data-swiper-parallax="-100"><?php echo wp_kses( $title, $allowedtags ) ?></div>
								<?php }
								if ( ! empty( $subtitle ) ) { ?>
                                    <div class="slider-content-text <?php echo esc_attr( $subtitle_tag ) ?>"
                                         data-swiper-parallax="-200"><?php echo do_shortcode( $subtitle ) ?></div>
								<?php } ?>

								<?php if ( count( $buttons ) > 0 ) { ?>
                                    <div class="main-slider-btn-wrap" data-swiper-parallax="-300">
										<?php foreach ( $buttons as $button ) {
											if ( ! empty( $button['label'] ) ) {
												$button_link = ( isset($button['link']) ) ? $button['link'] : array();
												$link      = seosight_gen_link_for_shortcode( $button_link );
												$classes   = array();
												$classes[] = 'btn'; // Base button class.
												$classes[] = 'btn-' . $button['size']; // Size class.
												$classes[] = 'btn--' . $button['color']; // Color class.
												$classes[] = 'on' === ( $button['shadow'] ) ? 'btn-hover-shadow' : ''; // Shadow class
												if ( isset( $button['outlined'] ) ) {
													$classes[] = 'on' === ( $button['outlined'] ) ? 'btn-border' : ''; // Shadow class
												}
												$classes[] = isset( $button['class'] ) ? $button['class'] : '';
												?>
                                                <a href="<?php echo esc_url( $link['link'] ) ?>"
                                                   target="<?php echo esc_attr( $link['target'] ) ?>"
                                                   class="<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
                                                    <span class="text"><?php echo esc_html( $button['label'] ) ?></span>
                                                    <span class="semicircle"></span>
                                                </a>
											<?php }
										} ?>
                                    </div>
								<?php } ?>
                            </div>

                            <div class="<?php echo esc_attr( $column_class ) ?>">
								<?php if ( isset( $slide['attachment_id'] ) && ! empty( $slide['attachment_id'] ) && 'background' !== $image_layout ) { ?>
                                    <div class="slider-thumb-img align-center" data-swiper-parallax="-400"
                                         data-swiper-parallax-duration="600">
										<?php echo wp_get_attachment_image($slide['attachment_id'], 'full'); ?>
                                    </div>
								<?php } ?>
                            </div>

                        </div>

                    </div>

				<?php } ?>
            </div>

			<?php if ( ( count( $data['slides'] ) > 1 ) && ( $slide_arrows !== 'off' ) ) { ?>
                <!--Prev next buttons-->
                <svg class="btn-next btn-next-black">
                    <use xlink:href="#arrow-right"></use>
                </svg>
                <svg class="btn-prev btn-prev-black">
                    <use xlink:href="#arrow-left"></use>
                </svg>
			<?php } ?>
            <!--Pagination tabs-->
			<?php if ( count( $data['slides'] ) > 1 && 'off' !== $slide_labels ) {
				$counter = 1;
				?>
                <div class="slider-slides">
					<?php foreach ( $data['slides'] as $slide ) {
						$bg_color    = seosight_akg( 'extra/bg-color', $slide, '#f7f9f9' );
						$title       = seosight_akg( 'extra/title', $slide, '' );
						$subtitle    = seosight_akg( 'extra/subtitle', $slide, '' );
						$slide_class = 'dark' === seosight_akg( 'extra/text-color', $slide, 'dark' ) ? 'main-slider-bg-light' : 'main-slider-bg-dark';
						?>
                        <a href="#" class="slides-item <?php echo esc_attr( $slide_class ) ?>"
                           style="background-color: <?php echo esc_attr( $bg_color ) ?>">
                            <div class="content">
                                <div class="text-wrap">
									<?php if ( ! empty( $title ) ) { ?>
                                        <h4 class="slides-title"><?php echo esc_html( $title ) ?></h4>
									<?php }
									if ( ! empty( $subtitle ) ) { ?>
                                        <div class="slides-sub-title"><?php echo esc_html( $subtitle ) ?></div>
									<?php } ?>
                                </div>
                                <div class="slides-number"><?php printf( "%02d", $counter );
									$counter ++; ?></div>
                            </div>
                        </a>
					<?php } ?>
                </div>
				<?php
			} ?>
        </div>
    </div>

    <!-- ... End Main Slider -->
<?php endif; ?>