'use strict';

function Graph() {
  this.nodes = {};
}

Graph.prototype.build = function(data) {
  let that = this;
  let internal = {};

  _.assign(internal, {
    addNode: (node) => {
      that.nodes[node] = that.nodes[node] || {};
    },
    addParent: (node, parent) => {
      internal.addNode(node);
      that.nodes[node][parent] = true;
    },
    addParents: (node, parents) => {
      _.forEach(parents, (parent) => {
        internal.addParent(node, parent);
      });
    },
    addTraits: (traits) => {
      _.forEach(traits, (trait) => {
        let node = trait.name;

        internal.addNode(node);
        internal.addParents(node, trait.parents);
      });
    },
    addClasses: (classes) => {
      _.forEach(classes, (classIns) => {
        let node = classIns.name;

        internal.addNode(node);
        internal.addParents(node, classIns.traits);

        if (classIns.parent) {
          internal.addParent(node, classIns.parent);
        }
      });
    }
  });

  internal.addTraits(data.traits);
  internal.addClasses(data.classes);
};

Graph.prototype.IsDescendantOf = function(node, ancestors) {
  return this.areDescendantsOf([node], ancestors);
};

Graph.prototype.IsDescendantOf = function(node, ancestors) {
  let thatGraph = this;
  let visitedNodes = {};
  let queue = [node];

  /* run BFS */
  while (queue.length > 0) {
    let currNode = queue.shift();
    let parents = _.map(thatGraph.nodes[currNode], (_, parent) => parent);

    if (!visitedNodes[currNode]) {
      visitedNodes[currNode] = true;
      Array.prototype.push.apply(queue, parents);
    }
  }

  return _.every(_.map(ancestors, (ancestor) => visitedNodes[ancestor]));
};

/* @ngInject */
function OperationsHierarchyService($q, OperationsApiClient) {
  let service = {};
  let graph = new Graph();
  let isLoaded = false;

  service.load = function load() {
    if (isLoaded) {
      let deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    } else {
      return OperationsApiClient.
      getHierarchy()
        .
      then((data) => {
        graph.build(data);
        isLoaded = true;
      });
    }
  };

  service.IsDescendantOf = (node, ancestors) => graph.IsDescendantOf(node, ancestors);

  return service;
}

exports.inject = function(module) {
  module.factory('OperationsHierarchyService', OperationsHierarchyService);
};
