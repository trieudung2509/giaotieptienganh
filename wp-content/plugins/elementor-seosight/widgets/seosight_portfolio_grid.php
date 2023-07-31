<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class Elementor_Seosight_Portfolio_Grid extends \Elementor\Widget_Base {

	public function get_name() {
		return 'seosight_portfolio_grid';
	}

	public function get_title() {
		return esc_html__( 'Portfolio Grid', 'elementor-seosight' );
	}

	public function get_icon() {
		return 'crum-el-w-portfolio-grid';
	}

	public function get_categories() {
		return [ 'elementor-seosight' ];
	}

	protected function _register_controls() {

        $post_taxonomy = [];
        $all_post_taxonomy = es_post_taxonomy();
        if ( $all_post_taxonomy ) {
            foreach ( $all_post_taxonomy as $post_type => $terms ){
                $post_taxonomy[ $post_type ] = ucwords( str_replace( [ '-', '_' ], ' ', $post_type ) );
            }
        }

		$this->start_controls_section(
			'seosight_portfolio_grid',
			[
				'label' => esc_html__( 'Portfolio Grid', 'elementor-seosight' )
			]
		);

        $this->add_control(
            'layout',
            [
                'type'      => \Elementor\Controls_Manager::SELECT,
                'label'     => esc_html__( 'Layout', 'elementor-seosight' ),
                'default'   => 'post',
                'options'   => array(
                    'post'      => esc_html__( 'Post', 'elementor-seosight' ),
                    'portfolio' => esc_html__( 'Portfolio', 'elementor-seosight' )

                ),

            ]
        );

        $this->add_control(
            'post_taxonomy', 
            [
                'type'    => \Elementor\Controls_Manager::SELECT,
                'label'   => esc_html__( 'Content Type', 'elementor-seosight' ),
                'default' => 'fw-portfolio',
                'options' => $post_taxonomy,
                'separator' => 'before'
            ]
        );

        if ( $all_post_taxonomy ) {
            foreach ( $all_post_taxonomy as $post_type => $terms ){
                $this->add_control(
                    'post_taxonomy_' . $post_type, 
                    [
                        'type'        => \Elementor\Controls_Manager::SELECT2,
                        'label'       => esc_html__( 'Select Content Type', 'elementor-seosight' ),
                        'description' => esc_html__( 'Choose supported content type such as post, custom post type, etc.', 'elementor-seosight' ),
                        'options'     => $terms,
                        'multiple'    => true,
                        'condition'   => [
                            'post_taxonomy' => $post_type
                        ],
                        'separator'   => 'before'
                    ]
                );
            }
        }

        $this->add_control(
            'order_by', 
            [
                'type'      => \Elementor\Controls_Manager::SELECT,
                'label'     => esc_html__( 'Order by', 'elementor-seosight' ),
                'default'   => 'ID',
                'options'   => array(
                    'ID'            => esc_html__( 'Post ID', 'elementor-seosight' ),
                    'author'        => esc_html__( 'Author', 'elementor-seosight' ),
                    'title'         => esc_html__( 'Title', 'elementor-seosight' ),
                    'name'          => esc_html__( 'Post name (post slug)', 'elementor-seosight' ),
                    'type'          => esc_html__( 'Post type (available since Version 4.0)', 'elementor-seosight' ),
                    'date'          => esc_html__( 'Date', 'elementor-seosight' ),
                    'modified'      => esc_html__( 'Last modified date', 'elementor-seosight' ),
                    'rand'          => esc_html__( 'Random order', 'elementor-seosight' ),
                    'comment_count' => esc_html__( 'Number of comments', 'elementor-seosight' )
                ),
                'separator' => 'before'
            ]
        );

        $this->add_control(
            'order_list', 
            [
                'type'      => \Elementor\Controls_Manager::SELECT,
                'label'     => esc_html__( 'Order', 'elementor-seosight' ),
                'default'   => 'ASC',
                'options'   => array(
                    'ASC'  => esc_html__( 'ASC', 'elementor-seosight' ),
                    'DESC' => esc_html__( 'DESC', 'elementor-seosight' ),
                ),
                'separator' => 'before'
            ]
        );

        $this->add_control(
            'number_post',
            [
                'type'        => \Elementor\Controls_Manager::SLIDER,
                'label'       => esc_html__( 'Number of items displayed', 'elementor-seosight' ),
                'description' => esc_html__( 'The number of items you want to show.', 'elementor-seosight' ),
                'default'     => [
                    'size' => 9,
                    'unit' => '%',
                ],
                'range'       => [
                    '%' => [
                        'min' => 1,
                        'max' => 30,
                    ],
                ],
                'separator'   => 'before'
            ]
        );

        $this->add_control(
            'number_of_items',
            [
                'type'        => \Elementor\Controls_Manager::SLIDER,
                'label'       => esc_html__( 'Items per row', 'elementor-seosight' ),
                'description' => esc_html__( 'Number of items displayed on one row', 'elementor-seosight' ),
                'default'     => [
                    'size' => 3,
                    'unit' => '%',
                ],
                'range'       => [
                    '%' => [
                        'min' => 1,
                        'max' => 6,
                    ],
                ],
                'separator'   => 'before'
            ]
        );

        $this->add_control(
            'custom_class',
            [
                'type'        => \Elementor\Controls_Manager::TEXT,
                'label'       => esc_html__( 'Extra class', 'elementor-seosight' ),
                'description' => esc_html__( 'If you wish to style a particular content element differently, please add a class name to this field and refer to it in your custom CSS file.', 'elementor-seosight' ),
                'separator'   => 'before'
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'title-css',
            [
                'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                'label' => esc_html__( 'Title', 'elementor-seosight' )
            ]
        );

        $this->add_group_control(
            \Elementor\Group_Control_Typography::get_type(),
            [
                'name'     => 'title_typography',
                'scheme'   => \Elementor\Core\Schemes\Typography::TYPOGRAPHY_1,
                'selector' => '{{WRAPPER}} .case-item__title',
            ]
        );

        $this->add_control(
            'title-color',
            [
                'type'      => \Elementor\Controls_Manager::COLOR,
                'label'     => esc_html__( 'Color', 'elementor-seosight' ),
                'scheme'    => [
                    'type'  => \Elementor\Core\Schemes\Color::get_type(),
                    'value' => \Elementor\Core\Schemes\Color::COLOR_1,
                ],
                'selectors' => [
                    '{{WRAPPER}} .case-item__title' => 'color: {{SCHEME}};'
                ],
                'separator' => 'before'
            ]
        );

        $this->add_control(
            'title-color-hover',
            [
                'type'      => \Elementor\Controls_Manager::COLOR,
                'label'     => esc_html__( 'Color on hover', 'elementor-seosight' ),
                'scheme'    => [
                    'type'  => \Elementor\Core\Schemes\Color::get_type(),
                    'value' => \Elementor\Core\Schemes\Color::COLOR_1,
                ],
                'selectors' => [
                    '{{WRAPPER}} .crumina-case-item:hover .case-item__title' => 'color: {{SCHEME}};'
                ],
                'separator' => 'before'
            ]
        );

        $this->add_control(
            'title_align', 
            [
                'type'      => \Elementor\Controls_Manager::CHOOSE,
                'label'     => esc_html__( 'Text Align', 'elementor-seosight' ),
                'options'   => [
                    'left'    => [
                        'title' => esc_html__( 'Left', 'elementor-seosight' ),
                        'icon'  => 'fa fa-align-left',
                    ],
                    'center'  => [
                        'title' => esc_html__( 'Centered', 'elementor-seosight' ),
                        'icon'  => 'fa fa-align-center',
                    ],
                    'right'   => [
                        'title' => esc_html__( 'Right', 'elementor-seosight' ),
                        'icon'  => 'fa fa-align-right',
                    ],
                    'justify' => [
                        'title' => esc_html__( 'Justify', 'elementor-seosight' ),
                        'icon'  => 'fa fa-align-justify',
                    ]
                ],
                'default'   => 'center',
                'separator' => 'before'
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'text-css',
            [
                'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                'label' => esc_html__( 'Text', 'elementor-seosight' )
            ]
        );

        $this->add_group_control(
            \Elementor\Group_Control_Typography::get_type(),
            [
                'name'     => 'text_typography',
                'scheme'   => \Elementor\Core\Schemes\Typography::TYPOGRAPHY_1,
                'selector' => '{{WRAPPER}} .crumina-case-item .case-item__cat a',
            ]
        );

        $this->add_control(
            'text-color',
            [
                'type'      => \Elementor\Controls_Manager::COLOR,
                'label'     => esc_html__( 'Color', 'elementor-seosight' ),
                'scheme'    => [
                    'type'  => \Elementor\Core\Schemes\Color::get_type(),
                    'value' => \Elementor\Core\Schemes\Color::COLOR_1,
                ],
                'selectors' => [
                    '{{WRAPPER}} .crumina-case-item .case-item__cat a' => 'color: {{SCHEME}};'
                ],
                'separator' => 'before'
            ]
        );

        $this->add_control(
            'text-color-hover',
            [
                'type'      => \Elementor\Controls_Manager::COLOR,
                'label'     => esc_html__( 'Color on hover', 'elementor-seosight' ),
                'scheme'    => [
                    'type'  => \Elementor\Core\Schemes\Color::get_type(),
                    'value' => \Elementor\Core\Schemes\Color::COLOR_1,
                ],
                'selectors' => [
                    '{{WRAPPER}} .crumina-case-item:hover .case-item__cat a' => 'color: {{SCHEME}};'
                ],
                'separator' => 'before'
            ]
        );

        $this->add_control(
            'text_align', 
            [
                'type'      => \Elementor\Controls_Manager::CHOOSE,
                'label'     => esc_html__( 'Text Align', 'elementor-seosight' ),
                'options'   => [
                    'left'    => [
                        'title' => esc_html__( 'Left', 'elementor-seosight' ),
                        'icon'  => 'fa fa-align-left',
                    ],
                    'center'  => [
                        'title' => esc_html__( 'Centered', 'elementor-seosight' ),
                        'icon'  => 'fa fa-align-center',
                    ],
                    'right'   => [
                        'title' => esc_html__( 'Right', 'elementor-seosight' ),
                        'icon'  => 'fa fa-align-right',
                    ],
                    'justify' => [
                        'title' => esc_html__( 'Justify', 'elementor-seosight' ),
                        'icon'  => 'fa fa-align-justify',
                    ]
                ],
                'default'   => 'center',
                'separator' => 'before'
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'image-box',
            [
                'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                'label' => esc_html__( 'Image', 'elementor-seosight' )
            ]
        );

        $this->add_control(
            'image-width',
            [
                'type'       => \Elementor\Controls_Manager::SLIDER,
                'label'      => __( 'Width', 'elementor-seosight' ),
                'size_units' => [ 'px', 'em', '%' ],
                'range'      => [
                    'px' => [
                        'min' => 1,
                        'max' => 1000,
                    ],
                    'em' => [
                        'min' => 1,
                        'max' => 100,
                    ],
                    '%' => [
                        'min' => 1,
                        'max' => 100,
                    ],
                ],
                'selectors'  => [
                    '{{WRAPPER}} .case-item__thumb img' => 'width: {{SIZE}}{{UNIT}};',
                ],
                'separator'  => 'before'
            ]
        );

        $this->add_control(
            'image-height',
            [
                'type'       => \Elementor\Controls_Manager::SLIDER,
                'label'      => __( 'Height', 'elementor-seosight' ),
                'size_units' => [ 'px', 'em', '%' ],
                'range'      => [
                    'px' => [
                        'min' => 1,
                        'max' => 1000,
                    ],
                    'em' => [
                        'min' => 1,
                        'max' => 100,
                    ],
                    '%' => [
                        'min' => 1,
                        'max' => 100,
                    ],
                ],
                'selectors'  => [
                    '{{WRAPPER}} .case-item__thumb img' => 'height: {{SIZE}}{{UNIT}};',
                ],
                'separator'  => 'before'
            ]
        );

        $this->add_control(
            'image-background-color',
            [
                'type'      => \Elementor\Controls_Manager::COLOR,
                'label'     => __( 'Background Color', 'elementor-seosight' ),
                'scheme'    => [
                    'type'  => \Elementor\Core\Schemes\Color::get_type(),
                    'value' => \Elementor\Core\Schemes\Color::COLOR_4,
                ],
                'selectors' => [
                    '{{WRAPPER}} .case-item__thumb' => 'background-color: {{VALUE}};',
                ],
                'separator' => 'before'
            ]
        );

        $this->add_group_control(
            'border',
            [
                'name'      => 'image-border',
                'label'     => esc_html__( 'Border', 'elementor-seosight' ),
                'selector'  => '{{WRAPPER}} .case-item__thumb',
                'separator' => 'before'
            ]
        );

        $this->add_control(
            'image-border-radius',
            [
                'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                'label'      => __( 'Border Radius', 'elementor-seosight' ),
                'size_units' => [ 'px', '%' ],
                'selectors'  => [
                    '{{WRAPPER}} .case-item__thumb, {{WRAPPER}} .case-item__thumb img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
                'condition'  => [
                    'border_border!' => '',
                ],
            ]
        );

        $this->add_control(
            'image-padding',
            [
                'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                'label'      => __( 'Padding', 'elementor-seosight' ),
                'size_units' => [ 'px', '%', 'em' ],
                'selectors'  => [
                    '{{WRAPPER}} .case-item__thumb' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
                'separator'  => 'before'
            ]
        );

        $this->add_control(
            'image-margin',
            [
                'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                'label'      => __( 'Margin', 'elementor-seosight' ),
                'size_units' => [ 'px', '%', 'em' ],
                'selectors'  => [
                    '{{WRAPPER}} .case-item__thumb' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
                'separator'  => 'before'
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'style-box',
            [
                'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
                'label' => esc_html__( 'Box style', 'elementor-seosight' )
            ]
        );

        $this->add_control(
            'style-background-color',
            [
                'type'      => \Elementor\Controls_Manager::COLOR,
                'label'     => __( 'Background Color', 'elementor-seosight' ),
                'scheme'    => [
                    'type'  => \Elementor\Core\Schemes\Color::get_type(),
                    'value' => \Elementor\Core\Schemes\Color::COLOR_4,
                ],
                'selectors' => [
                    '{{WRAPPER}} .crumina-case-item' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'style-background-color-hover',
            [
                'type'      => \Elementor\Controls_Manager::COLOR,
                'label'     => __( 'Background Color on hover', 'elementor-seosight' ),
                'scheme'    => [
                    'type'  => \Elementor\Core\Schemes\Color::get_type(),
                    'value' => \Elementor\Core\Schemes\Color::COLOR_4,
                ],
                'selectors' => [
                    '{{WRAPPER}} .crumina-case-item:hover' => 'background-color: {{VALUE}};',
                ],
                'separator' => 'before'
            ]
        );

        $this->add_control(
            'style-align', 
            [
                'type'      => \Elementor\Controls_Manager::CHOOSE,
                'label'     => esc_html__( 'Text Align', 'elementor-seosight' ),
                'options'   => [
                    'left'    => [
                        'title' => esc_html__( 'Left', 'elementor-seosight' ),
                        'icon'  => 'fa fa-align-left',
                    ],
                    'center'  => [
                        'title' => esc_html__( 'Centered', 'elementor-seosight' ),
                        'icon'  => 'fa fa-align-center',
                    ],
                    'right'   => [
                        'title' => esc_html__( 'Right', 'elementor-seosight' ),
                        'icon'  => 'fa fa-align-right',
                    ],
                    'justify' => [
                        'title' => esc_html__( 'Justify', 'elementor-seosight' ),
                        'icon'  => 'fa fa-align-justify',
                    ]
                ],
                'default'   => 'center',
                'separator' => 'before'
            ]
        );

        $this->add_control(
            'style-padding',
            [
                'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                'label'      => __( 'Padding', 'elementor-seosight' ),
                'size_units' => [ 'px', '%', 'em' ],
                'selectors'  => [
                    '{{WRAPPER}} .crumina-case-item' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
                'separator'  => 'before'
            ]
        );

        $this->add_control(
            'style-margin',
            [
                'type'       => \Elementor\Controls_Manager::DIMENSIONS,
                'label'      => __( 'Margin', 'elementor-seosight' ),
                'size_units' => [ 'px', '%', 'em' ],
                'selectors'  => [
                    '{{WRAPPER}} .crumina-case-item' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
                'separator'  => 'before'
            ]
        );

        $this->end_controls_section();
	}

	protected function render() {
        $settings = $this->get_settings_for_display();

        $orderby         = ! empty( $settings['order_by'] ) ? $settings['order_by'] : 'ID';
        $order           = ! empty( $settings['order_list'] ) ? $settings['order_list'] : 'ASC';
        $post_type       = ! empty( $settings['post_taxonomy'] ) ? $settings['post_taxonomy'] : 'fw-portfolio';
        $terms           = ! empty( $settings['post_taxonomy_'. $post_type ] ) ? $settings['post_taxonomy_'. $post_type ] : [];
        $posts_per_page  = ! empty( $settings['number_post']['size'] ) ? $settings['number_post']['size'] : 9;
        $number_of_items = ! empty( $settings['number_of_items']['size'] ) ? $settings['number_of_items']['size'] : 3;
        $layout         = ! empty( $settings['layout']) ? $settings['layout'] : 'post';

        $taxonomy_objects = get_object_taxonomies( $post_type, 'objects' );
        $taxonomy         = key( $taxonomy_objects );

        $args = array(
            'post_type'        => $post_type,
            'posts_per_page'   => $posts_per_page,
            'orderby'          => $orderby,
            'order'            => $order,
            'suppress_filters' => false
        );

        if ( $terms ) {
            $args['tax_query'] = array(
                'relation' => 'OR',
                array(
                    'taxonomy' => $taxonomy,
                    'field'    => 'slug',
                    'terms'    => $terms,
                )
            );
        }

        $the_query = new WP_Query( $args );

        $wrap_class = [ 'crumina-module', 'portfolio-grid' ];
        if ( ! empty( $settings['custom_class'] ) ) {
            $wrap_class[] = $settings['custom_class'];
        }

        // portfolio format settings
        $container_width = 1170;
        $gap_paddings    = 90;
        $grid_size       = intval( 12 / $number_of_items );
        $img_width       = intval( $container_width / ( 12 / $grid_size ) ) - $gap_paddings;
        $img_height      = intval( $img_width * 0.75 );
        $default_src     = ES_PLUGIN_URL . '/assets/images/get_start.jpg';
        $item_class_add  = $grid_size > 5 ? 'big mb60' : 'mb30';
        $title_tag       = $grid_size > 5 ? 'h5' : 'h6';

        $title_align = ! empty( $settings['title_align'] ) ? es_get_align( $settings['title_align'] ) : '';
        $text_align  = ! empty( $settings['text_align'] ) ? es_get_align( $settings['text_align'] ) : '';
        $style_align = ! empty( $settings['style-align'] ) ? es_get_align( $settings['style-align'] ) : '';

        ob_start();
        $i = 1;
            if ( $the_query->have_posts() ) {
                while ( $the_query->have_posts() ) { $the_query->the_post();
                    $open_link    = es_get_fw_options( get_the_ID(), 'open-item' );
                    $thumbnail_id = get_post_thumbnail_id();

                    if ( $open_link === 'lightbox' ) {
                        $permalink  = wp_get_attachment_url( $thumbnail_id );
                        $link_class = 'js-zoom-image';

                    } else {
                        $permalink  = get_the_permalink();
                        $link_class = '';
                    }

                    if ( $thumbnail_id ) {
                        $thumbnail       = get_post( $thumbnail_id );
                        $image           = es_resize( $thumbnail->ID, $img_width, $img_height, true );
                        $thumbnail_title = $thumbnail->post_title;
                    } else {
                        $image           = $default_src;
                        $thumbnail_title = get_the_title();
                    }

                    ?>
                    <div class="col-lg-<?php echo esc_attr( $grid_size ); ?> col-md-<?php echo esc_attr( $grid_size ); ?> col-sm-6 col-xs-12">
                    <?php if ( 'post' === $layout ) { ?>
                        <article class="hentry post">
                            <a href="<?php echo esc_url( $permalink ) ?>" class="<?php echo esc_attr( $link_class ) ?>">
                                <img src="<?php echo esc_url( $image ) ?>" width="<?php echo esc_attr( $img_width ) ?>"
                                     height="<?php echo esc_attr( $img_height ) ?>"
                                     alt="<?php echo esc_attr( $thumbnail_title ) ?>"
                                     loading="lazy"
                                >
                            </a>
                            <div class="post__content">
                                <?php the_title( '<h5 class="entry-title"><a class="post__title" href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h5>' ); ?>

                                <?php if ( ! has_excerpt() ) {
                                    $post_content = get_the_content();
                                } else {
                                    $post_content = get_the_excerpt();
                                }
                                $post_content = strip_shortcodes( $post_content );
                                ?>
                                <p class="post__text">
                                    <?php echo wp_trim_words( $post_content, 10, '' ); ?>
                                </p>
                            </div>

                        </article>
                    <?php } else { ?>
                        <div class="crumina-case-item <?php echo esc_attr( $item_class_add ); ?>" data-mh="recent-folio-grid" <?php echo $style_align; ?>>
                            <div class="case-item__thumb mouseover lightbox shadow animation-disabled">
                                <a href="<?php echo esc_url( $permalink ); ?>" class="<?php echo esc_attr( $link_class ) ?>">
                                    <img src="<?php echo esc_url( $image ); ?>" width="<?php echo esc_attr( $img_width ); ?>" height="<?php echo esc_attr( $img_height ); ?>" alt="<?php echo esc_attr( $thumbnail_title ); ?>" loading="lazy" >
                                </a>
                            </div>
                            <a href="<?php echo esc_url( $permalink ); ?>"  class="<?php echo esc_attr( $title_tag ); ?> case-item__title" <?php echo $title_align; ?>><?php the_title(); ?></a>
                            <?php the_terms( get_the_ID(), $taxonomy, '<div class="case-item__cat" ' . $text_align . '>', ', ', '</div>' ); ?>
                        </div>
                        <?php } ?>
                    </div>
                    <?php
                    if ( 0 === $i % $number_of_items ) {
                        echo '<div class="clearfix"></div>';
                    }
                    $i ++;
                }
            } else {
                echo '<div class="col-xs-12"><h2>' . esc_html__( ' No posts found', 'elementor-seosight' ) . '</h2></div>';
            }
            wp_reset_postdata();

        $output = ob_get_clean();
    ?>
        <div class="<?php echo esc_attr( implode( ' ', $wrap_class ) ) ?>">
            <div class="row">
                <?php es_render( $output ); ?>
            </div>
        </div>
    <?php
    }
}