if ( typeof exports === 'object' && typeof exports.nodeName !== 'string' && typeof define !== 'function' ) {
    var define = function( factory ) {
        factory( require, exports, module );
    };
}

define( function( require, exports, module ) {
    'use strict';
    var Widget = require( '../../js/Widget' );
    var $ = require( 'jquery' );
    require( '../../js/plugins' );

    var pluginName = 'selectPickerUngaCollapse';

    /**
     * @constructor
     * @param {Element} element [description]
     * @param {(boolean|{touch: boolean, repeat: boolean})} options options
     * @param {*=} e     event
     */
    function SelectPickerUngaCollapse( element, options ) {
        this.namespace = pluginName;
        Widget.call( this, element, options );
        this._init();
    }

    //copy the prototype functions from the Widget super class
    SelectPickerUngaCollapse.prototype = Object.create( Widget.prototype );

    //ensure the constructor is the new one
    SelectPickerUngaCollapse.prototype.constructor = SelectPickerUngaCollapse;

    SelectPickerUngaCollapse.prototype._init = function() {
        var $labelEl = $( this.element ).siblings( '.option-label.active' );
        var labels = $labelEl.html().split( /\|/ ).map( function( label ) {
            return label.trim();
        } );

        this.$collapseButton = $( '<button class="btn-collapse btn-icon-only"><i class="icon"> </i></button>' );
        this.$collapsible = $( '<span class="sub-option-label collapsible">' + labels[ 1 ] + '</span>' );

        $labelEl.html( labels[ 0 ] )
            .after( this.$collapsible );

        $labelEl.append( this.$collapseButton );

        this._setButtonHandler();
    };

    SelectPickerUngaCollapse.prototype._renderLabels = function() {
        // reserved in case translations need to be supported..
    };

    SelectPickerUngaCollapse.prototype._setButtonHandler = function() {
        this.$collapseButton.on( 'click', function() {
            var $label = $( this ).parent( '.option-label' );
            var open = $label.hasClass( 'open' );
            $label.toggleClass( 'open', !open );
            return true;
        } );
    };

    SelectPickerUngaCollapse.prototype.destroy = function( element ) {};

    $.fn[ pluginName ] = function( options, event ) {
        return this.each( function() {
            var $this = $( this ),
                data = $this.data( pluginName );

            options = options || {};

            if ( !data && typeof options === 'object' ) {
                $this.data( pluginName, ( data = new SelectPickerUngaCollapse( this, options, event ) ) );
            } else if ( data && typeof options === 'string' ) {
                data[ options ]( this );
            }
        } );
    };

    module.exports = {
        'name': pluginName,
        'selector': '.or-appearance-unga-collapse input[type="checkbox"]'
    };
} );
