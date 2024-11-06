<?php 
/**
 * Template For: Testimonial Grid
 */

 function etb_testimonial_grid( $attributes ) {
  $handle = $attributes['id'];

  $css ='';

  // grid
  if(isset($attributes['zIndex'])) {
    $css .= ".$handle.wp-block-etb-grid{";
      $css .= "z-index: {$attributes['zIndex']};";
    $css .= "}";
  }

  $css .= ".$handle .wp-block-etb-grid-item{";
    if(!empty($attributes['containerBg'])) {
      $css .= "background: {$attributes['containerBg']};";
    }
    $css .= "border-radius: {$attributes['containerBorderRadius']}px;";
    if($attributes['containerBorder']['width'] !== 0 ) {
      $css .= "border: {$attributes['containerBorder']['width']}px {$attributes['containerBorder']['style']} {$attributes['containerBorder']['color']};";
    }
  $css .= "}";

  // testimonial quote icon + rating
  $css .= ".$handle .quote-icon svg{";
    if(!empty($attributes['iconColor'])) {
      $css .= "fill: {$attributes['iconColor']};";
    }
    
    $css .= "opacity: {$attributes['iconOpacity']};";
  $css .= "}";

  $css .= ".$handle .rate-select-layer span{";
    if(!empty($attributes['ratingColor'])){
      $css .= "color: {$attributes['ratingColor']};";
    }
  $css .= "}";

  $css .= ".$handle .rating{";
    if(!empty($attributes['ratingColor'])){
      $css .= "color: {$attributes['ratingColor']};";
    }
  $css .= "}";

  // testimonial bar
  if($attributes['showBar'] == true) {
    $css .= ".$handle.etb-has-bar.etb_left .wp-block-etb-grid-item{";
      if(!empty($attributes['barColor'])){
        $css .= "border-left-color: {$attributes['barColor']};";
      }
      $css .= "border-left-width: {$attributes['barThickness']}px;";
    $css .= "}";

    $css .= ".$handle.etb-has-bar.etb_right .wp-block-etb-grid-item{";
      if(!empty($attributes['barColor'])){
        $css .= "border-right-color: {$attributes['barColor']};";
      }
      $css .= "border-right-width: {$attributes['barThickness']}px;";
    $css .= "}";

    $css .= ".$handle.etb-has-bar.etb_top .wp-block-etb-grid-item{";
      if(!empty($attributes['barColor'])){
        $css .= "border-top-color: {$attributes['barColor']};";
      }
      $css .= "border-top-width: {$attributes['barThickness']}px;";
    $css .= "}";

    $css .= ".$handle.etb-has-bar.etb_bottom .wp-block-etb-grid-item{";
      if(!empty($attributes['barColor'])){
        $css .= "border-bottom-color: {$attributes['barColor']};";
      }
      $css .= "border-bottom-width: {$attributes['barThickness']}px;";
    $css .= "}";
  }

  // testimonial message
  $css .= ".$handle .testimonial-message{";
    if(!empty($attributes['ttmFontColor'])){
      $css .= "color: {$attributes['ttmFontColor']};";
    }
    $css .= "text-align: {$attributes['ttmAlign']};";
  $css .= "}";

  // reviewer info
  $css .= ".$handle .reviewer-info{";
    $css .= "justify-content: {$attributes['infoAlign']};";
  $css .= "}";

  

  // reviewer photo
  $css .= ".$handle .reviewer-photo{";
    if(isset($attributes['photoBorderRadius'])) {
      $css .= "border-radius: {$attributes['photoBorderRadius']}%;";
    }
    if($attributes['photoBorder']['width'] !== '0px') {
      $borderType = isset($attributes['photoBorder']['style']) ? $attributes['photoBorder']['style'] : 'solid';
      $borderColor = isset($attributes['photoBorder']['color']) ? $attributes['photoBorder']['color'] : '#fa0';
      $css .= "border: {$attributes['photoBorder']['width']} {$borderType} {$borderColor} ;";
    }
  $css .= "}";

    // reviewer info
    $css .= ".$handle .reviewer-name{";
      if(!empty($attributes['nameFontColor'])) {
        $css .= "color: {$attributes['nameFontColor']};";
      }
    $css .= "}";

    $css .= ".$handle .reviewer-title{";
      if(!empty($attributes['titleFontColor'])) {
        $css .= "color: {$attributes['titleFontColor']};";
      }
    $css .= "}";

    $css .= ".$handle .reviewer-company{";
      if(!empty($attributes['companyFontColor'])) {
        $css .= "color: {$attributes['companyFontColor']};";
      }
    $css .= "}";

  // Desktop
  $css .= "@media (min-width: 1025px) {";
    // grid 
    $css .= ".$handle.wp-block-etb-grid{";
      $css .= "grid-template-columns: repeat({$attributes['gridCols']['desktop']}, 1fr);";
      $css .= "grid-gap: {$attributes['gridGap']['desktop']}px;";
    $css .= "}";

    $css .= ".$handle .wp-block-etb-grid-item{";
      $css .= "padding: {$attributes['containerPadding']['desktop']}px;";
    $css .= "}";

    $css .= ".$handle .quote-icon svg{";
      $css .= "width: {$attributes['iconSizes']['desktop']}px;";
    $css .= "}";

    $css .= ".$handle .testimonial-message{";
      $css .= "font-size: {$attributes['ttmFontSizes']['desktop']}px;";
    $css .= "}";

    $css .= ".$handle .reviewer-photo{";
      $css .= "width: {$attributes['photoSizes']['desktop']}px;";
      $css .= "height: {$attributes['photoSizes']['desktop']}px;";
    $css .= "}";

    $css .= ".$handle .reviewer-name{";
      $css .= "font-size: {$attributes['nameFontSizes']['desktop']}px;";
    $css .= "}";

    $css .= ".$handle .reviewer-title{";
      $css .= "font-size: {$attributes['titleFontSizes']['desktop']}px;";
    $css .= "}";

    $css .= ".$handle .reviewer-company{";
      $css .= "font-size: {$attributes['companyFontSizes']['desktop']}px;";
    $css .= "}";

  $css .= "}";

  // Tablet
  $css .= "@media (min-width: 768px) and (max-width: 1024px) {";
    // grid 
    $css .= ".$handle.wp-block-etb-grid{";
      $css .= "grid-template-columns: repeat({$attributes['gridCols']['tablet']}, 1fr);";
      $css .= "grid-gap: {$attributes['gridGap']['tablet']}px;";
    $css .= "}";

    $css .= ".$handle .wp-block-etb-grid-item{";
      $css .= "padding: {$attributes['containerPadding']['tablet']}px;";
    $css .= "}";

    $css .= ".$handle .quote-icon svg{";
      $css .= "width: {$attributes['iconSizes']['tablet']}px;";
    $css .= "}";

    $css .= ".$handle .testimonial-message{";
      $css .= "font-size: {$attributes['ttmFontSizes']['tablet']}px;";
    $css .= "}";

    $css .= ".$handle .reviewer-photo{";
      $css .= "width: {$attributes['photoSizes']['tablet']}px;";
      $css .= "height: {$attributes['photoSizes']['tablet']}px;";
    $css .= "}";

    $css .= ".$handle .reviewer-name{";
      $css .= "font-size: {$attributes['nameFontSizes']['tablet']}px;";
    $css .= "}";

    $css .= ".$handle .reviewer-title{";
      $css .= "font-size: {$attributes['titleFontSizes']['tablet']}px;";
    $css .= "}";

    $css .= ".$handle .reviewer-company{";
      $css .= "font-size: {$attributes['companyFontSizes']['tablet']}px;";
    $css .= "}";

  $css .= "}";

  // Mobile
  $css .= "@media (max-width: 767px) {";
    // grid 
    $css .= ".$handle.wp-block-etb-grid{";
      $css .= "grid-template-columns: repeat({$attributes['gridCols']['mobile']}, 1fr);";
      $css .= "grid-gap: {$attributes['gridGap']['mobile']}px;";
    $css .= "}";

    $css .= ".$handle .wp-block-etb-grid-item{";
      $css .= "padding: {$attributes['containerPadding']['mobile']}px;";
    $css .= "}";

    $css .= ".$handle .quote-icon svg{";
      $css .= "width: {$attributes['iconSizes']['mobile']}px;";
    $css .= "}";

    $css .= ".$handle .testimonial-message{";
      $css .= "font-size: {$attributes['ttmFontSizes']['mobile']}px;";
    $css .= "}";

    $css .= ".$handle .reviewer-photo{";
      $css .= "width: {$attributes['photoSizes']['mobile']}px;";
      $css .= "height: {$attributes['photoSizes']['mobile']}px;";
    $css .= "}";

    $css .= ".$handle .reviewer-name{";
      $css .= "font-size: {$attributes['nameFontSizes']['mobile']}px;";
    $css .= "}";

    $css .= ".$handle .reviewer-title{";
      $css .= "font-size: {$attributes['titleFontSizes']['mobile']}px;";
    $css .= "}";

    $css .= ".$handle .reviewer-company{";
      $css .= "font-size: {$attributes['companyFontSizes']['mobile']}px;";
    $css .= "}";

  $css .= "}";

   return $css; 
 }