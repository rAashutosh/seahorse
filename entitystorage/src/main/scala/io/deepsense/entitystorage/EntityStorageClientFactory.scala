/**
 * Copyright (c) 2015, CodiLime, Inc.
 *
 * Owner: Jacek Laskowski
 */
package io.deepsense.entitystorage

import akka.actor.{ActorRef, ActorSystem}

trait EntityStorageClientFactory {
  def create(actorRef: ActorRef): EntityStorageClient
}
