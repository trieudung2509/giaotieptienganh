<?php
/*
  * FIle for include classes and functions for extending
  * Plugins functionality when tat plugins are installed
  */


/**
 * Activate theme Plugins.
 *
 * @internal
 */
function _action_seosight_register_required_plugins() {
	$plugin_extensions = array();
	$core_plugins = array(
		array(
			'name'         => esc_html__( 'Unyson', 'seosight' ),
			'slug'         => 'unyson',
			'source'       => 'http://up.crumina.net/plugins/unyson.zip', // The plugin source
			'version'      => '2.15',
			'is_automatic' => true,
			'required'     => true,
		),
		/*array(
			'name'         => esc_attr__( 'Envato Market', 'seosight' ),
			'slug'         => 'envato-market',
			'source'       => 'https://envato.github.io/wp-envato-market/dist/envato-market.zip', // The plugin source
			'required'     => true,
		),*/
		array(
			'name'         => 'Mailchimp for WordPress',
			'slug'         => 'mailchimp-for-wp',
			'required'     => false,
		),
	);
	if (  did_action( 'elementor/loaded' ) ) {
		$plugin_extensions = array(
			array(
				'name'         => esc_attr__( 'Elementor Seosight Widgets', 'seosight' ),
				'slug'         => 'elementor-seosight',
				'source'       => 'http://up.crumina.net/plugins/elementor-seosight.zip', // The plugin source
				'version'      => '2.6',
			),
		);
	}

	if ( class_exists( 'KingComposer' ) ) {
		$plugin_extensions_kc = array(
			'name'         => esc_html__( 'KingComposer Seosight', 'seosight' ),
			'slug'         => 'kingcomposer-seosight',
			'source'       => 'http://up.crumina.net/plugins/kingcomposer-seosight.zip',
			'version'      => '1.4',
			'is_automatic' => true,
			'required'     => true,
		);

		array_push($plugin_extensions, $plugin_extensions_kc);
	}

    tgmpa(  array_merge($core_plugins, $plugin_extensions ) );
}

add_action( 'tgmpa_register', '_action_seosight_register_required_plugins' );


if ( class_exists( 'WooCommerce' ) ) {
	$file_path = locate_template( 'inc/plugins-extend/woocommerce.php' );
	load_template( $file_path );
}
if (  did_action( 'elementor/loaded' ) ) {
	$file_path = locate_template( 'inc/plugins-extend/elementor.php' );
	load_template( $file_path );
}



//theme activate
load_template( get_template_directory().'/inc/includes/auto-setup/class-fw-auto-install.php', true );

