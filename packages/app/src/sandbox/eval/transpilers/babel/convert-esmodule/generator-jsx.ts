/**
 * Derived from https://unpkg.com/browse/astring-jsx@1.0.1/index.js
 */

export default {
  // <div></div>
  JSXElement(node, state) {
    var output = state.output;
    state.write('<');
    this[node.openingElement.type](node.openingElement, state);
    if (node.closingElement) {
      state.write('>');
      for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        this[child.type](child, state);
      }
      state.write('</');
      this[node.closingElement.type](node.closingElement, state);
      state.write('>');
    } else {
      state.write(' />');
    }
  },
  // <div>
  JSXOpeningElement: function JSXOpeningElement(node, state) {
    var output = state.output;
    this[node.name.type](node.name, state);
    for (var i = 0; i < node.attributes.length; i++) {
      var attr = node.attributes[i];
      this[attr.type](attr, state);
    }
  },
  // </div>
  JSXClosingElement: function JSXOpeningElement(node, state) {
    var output = state.output;
    this[node.name.type](node.name, state);
  },
  // div
  JSXIdentifier: function JSXOpeningElement(node, state) {
    var output = state.output;
    state.write(node.name);
  },
  // Member.Expression
  JSXMemberExpression: function JSXMemberExpression(node, state) {
    var output = state.output;
    this[node.object.type](node.object, state);
    state.write('.');
    this[node.property.type](node.property, state);
  },
  // attr="something"
  JSXAttribute: function JSXAttribute(node, state) {
    var output = state.output;
    state.write(' ');
    this[node.name.type](node.name, state);
    state.write('=');
    this[node.value.type](node.value, state);
  },
  // namespaced:attr="something"
  JSXNamespacedName: function JSXNamespacedName(node, state) {
    var output = state.output;
    this[node.namespace.type](node.namespace, state);
    state.write(':');
    this[node.name.type](node.name, state);
  },
  // {expression}
  JSXExpressionContainer: function JSXExpressionContainer(node, state) {
    var output = state.output;
    state.write('{');
    this[node.expression.type](node.expression, state);
    state.write('}');
  },
  JSXText(node, state) {
    state.write(node.value);
  },
};
