( function( win, doc ) {
  'use strict';

  function DOM( elements ) {
    if( !( this instanceof DOM ) )
        return new DOM( elements );
    this.element = doc.querySelectorAll( elements );
  }

  DOM.isObject = function isObject( param ) {
    return Object.prototype.toString.call( param );
  }

  DOM.validateObject = (function() {
    var defaultObjects = [ 
      'isArray', 
      'isFunction', 
      'isObject', 
      'isNumber', 
      'isString', 
      'isBoolean', 
      'isNull' ];
    var defaultValidateMethods = {};
    defaultObjects.forEach( function( obj ) {
      return defaultValidateMethods[ obj ] = function() {
        return function( param ) {
          if( arguments[1] )
            return this.isObject( param ) === '[object Null]' || this.isObject( param ) === '[object Undefined]';           
          return this.isObject( param ) === objName;
        }
      };
    } );
    return defaultValidateMethods;
  })();

  DOM.isArray = DOM.validateObject.isArray( '[object Array]' );
  DOM.isFunction = DOM.validateObject.isFunction( '[object Function]' );
  DOM.isObject = DOM.validateObject.isObject( '[object Object]' );
  DOM.isNumber = DOM.validateObject.isNumber( '[object Number]' );
  DOM.isString = DOM.validateObject.isString( '[object String]' );
  DOM.isBoolean = DOM.validateObject.isBoolean( '[object Boolean]' );
  DOM.isNull = DOM.validateObject.isNull( '[object Null]', '[object Undefined]' );

  DOM.method = ( function() {
    var arrMethods = [ 
        'forEach', 
        'map', 
        'filter',
        'reduce',
        'reduceRight',
        'every',
        'some'
      ];
    var listMethods = {};
    arrMethods.forEach( function( item ) {
      listMethods[ item ] = function() {
        return Array.prototype[ item ].apply( this.element, arguments);
      };
    });
    return listMethods;
  })();

  DOM.prototype.forEach = DOM.method.forEach;
  DOM.prototype.map = DOM.method.map;
  DOM.prototype.filter = DOM.method.filter;
  DOM.prototype.reduce = DOM.method.reduce;
  DOM.prototype.reduceRight = DOM.method.reduceRight;
  DOM.prototype.every = DOM.method.every;
  DOM.prototype.some = DOM.method.some;

  DOM.prototype.on = function on( eventType, callback ) {
      this.forEach( function( $element ){ 
          $element.addEventListener( eventType, callback, false);
      });
  };

  DOM.prototype.off = function off( eventType, callback ) {
      this.forEach( function( element ) {
          $element.removeEventListener( eventType, callback, false );
      });
  };

  DOM.prototype.get = function get( index ) {
      if( !index )
          return this.element[ 0 ];
      return this.element[ index ];
  };

  win.DOM = DOM;
})( window, document );
