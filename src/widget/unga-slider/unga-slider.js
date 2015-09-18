if ( typeof exports === 'object' && typeof exports.nodeName !== 'string' && typeof define !== 'function' ) {
    var define = function( factory ) {
        factory( require, exports, module );
    };
}
/**
 * @preserve Copyright 2012 Martijn van de Rijdt & Modilabs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define( function( require, exports, module ) {
    'use strict';
    var Widget = require( '../../js/Widget' );
    var $ = require( 'jquery' );
    var pluginName = 'ungaSlider';

    require( 'bootstrap-slider-basic' );

    /**
     * @constructor
     * @param {Element} element [description]
     * @param {(boolean|{touch: boolean, repeat: boolean})} options options
     * @param {*=} e     event
     */
    function UngaSlider( element, options ) {
        this.namespace = pluginName;
        Widget.call( this, element, options );
        this._init();
    }

    //copy the prototype functions from the Widget super class
    UngaSlider.prototype = Object.create( Widget.prototype );

    //ensure the constructor is the new one
    UngaSlider.prototype.constructor = UngaSlider;

    UngaSlider.prototype._init = function() {
        var value = Number( this.element.value ) || -1;

        $( this.element ).slider( {
            reversed: false,
            min: 1,
            max: 7,
            orientation: 'horizontal',
            step: 1,
            value: value
        } );
        this.$widget = $( this.element ).next( '.widget' );
        this.$slider = this.$widget.find( '.slider' );
        this._renderSmileys();
        this._renderValueBubble();
        this._setChangeHandler();
    };

    UngaSlider.prototype._renderSmileys = function() {
        this.$widget.append( '<div class="sad"><i class="fa fa-fw fa-frown-o"></i></div>' );
        this.$widget.append( '<div class="happy"><i class="fa fa-fw fa-smile-o"></i></div>' );
    };

    UngaSlider.prototype._renderValueBubble = function() {
        this.$showValue = $( '<div class="show-value">' + this.element.value + '</div>' ).insertBefore( this.element );
    };

    UngaSlider.prototype._updateCurrentValueShown = function() {
        this.$showValue.text( this.element.value );
    };

    UngaSlider.prototype._setChangeHandler = function() {
        var that = this;

        $( this.element ).on( 'slideStop.' + this.namespace, function( slideEvt ) {
            $( this ).trigger( 'change' );
            that._updateCurrentValueShown();
        } );
    };

    UngaSlider.prototype.destroy = function( element ) {};

    $.fn[ pluginName ] = function( options, event ) {
        return this.each( function() {
            var $this = $( this ),
                data = $this.data( pluginName );

            options = options || {};

            if ( !data && typeof options === 'object' ) {
                $this.data( pluginName, ( data = new UngaSlider( this, options, event ) ) );
            } else if ( data && typeof options === 'string' ) {
                data[ options ]( this );
            }
        } );
    };

    module.exports = {
        'name': pluginName,
        'selector': '.or-appearance-unga-slider-7 input[type="number"]'
    };
} );
