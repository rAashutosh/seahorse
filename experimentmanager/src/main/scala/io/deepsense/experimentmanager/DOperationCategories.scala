/**
 * Copyright (c) 2015, CodiLime Inc.
 */

package io.deepsense.experimentmanager

import java.util.UUID

import io.deepsense.deeplang.catalogs.doperations.DOperationCategory

object DOperationCategories {

  object IO extends DOperationCategory(
    UUID.fromString("5a39e324-15f4-464c-83a5-2d7fba2858aa"), "Input/Output")

  object Transformation extends DOperationCategory(
    UUID.fromString("3fcc6ce8-11df-433f-8db3-fa1dcc545ed8"), "Transformation")

  object DataManipulation
    extends DOperationCategory(
      UUID.fromString("6c730c11-9708-4a84-9dbd-3845903f32ac"), "Data manipulation")

  object ML extends DOperationCategory(
      UUID.fromString("c730c11-9708-4a84-9dbd-3845903f32ac"), "Machine learning") {

    object Regression extends DOperationCategory(
      UUID.fromString("c80397a8-7840-4bdb-83b3-dc12f1f5bc3c"), "Regression", ML)

    object Classification extends DOperationCategory(
      UUID.fromString("ff13cbbd-f4ec-4df3-b0c3-f6fd4b019edf"), "Classification", ML)

    object Clustering extends DOperationCategory(
      UUID.fromString("5d6ed17f-7dc5-4b50-954c-8b2bbe6da2fd"), "Clustering", ML)

    object Evaluation extends DOperationCategory(
      UUID.fromString("b5d34823-3f2c-4a9a-9114-3c126ce8dfb6"), "Evaluation", ML)

    object FeatureSelection extends DOperationCategory(
      UUID.fromString("dd29042a-a32c-4948-974f-073c41230da0"), "Feature selection", ML)
  }
}
