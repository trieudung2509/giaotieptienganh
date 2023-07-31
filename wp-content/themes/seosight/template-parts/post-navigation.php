<?php
/**
 * Template part for displaying section with previous / next posts.
 *
 * @link    https://codex.wordpress.org/Template_Hierarchy
 *
 * @package seosight
 */

$swap_posts_direction = seosight_get_option_value('flip-prev-next-order', false, array('bool_val' => 'yes'));

if ( $swap_posts_direction ) {
	$prev_post = get_next_post();
	$next_post = get_previous_post();
} else {
	$prev_post = get_previous_post();
	$next_post = get_next_post();
}

$taxonomy    = get_query_var( 'taxonomy', 'category' );
$parent_page = get_query_var( 'navigation_page', 0 );
?>
<div class="pagination-arrow">
<?php $orig_post = $post;
global $post;
$categories = get_the_category($post->ID);
if ($categories) {
$category_ids = array();
foreach($categories as $individual_category) $category_ids[] = $individual_category->term_id;

$args=array(
'category__in' => $category_ids,
'post__not_in' => array($post->ID),
'posts_per_page'=> 3, // Number of related posts that will be shown.
'orderby'        => 'rand',
'ignore_sticky_posts'=>1
);

$my_query = new wp_query( $args );
if( $my_query->have_posts() ) {
echo '<div id="related_posts"><p class="ratels">Bài Viết Liên Quan</p><ul>';
while( $my_query->have_posts() ) {
$my_query->the_post();?>

<li><div class="relatedthumb"><a href="<? the_permalink()?>" title="<?php the_title(); ?>"><?php the_post_thumbnail('medium', array( 'alt' => get_the_title() )); ?></a></div>
<span><a href="<? the_permalink()?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></span>
</li>
<?
}
echo '</ul></div>';
}
}
$post = $orig_post;
wp_reset_query(); ?>
</div>