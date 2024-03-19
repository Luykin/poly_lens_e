// Copyright 2009, 2023 HP Development Company, L.P. The information contained herein is
// subject to change without notice.

import player, {
  AnimationConfigWithData,
  AnimationConfigWithPath,
  AnimationDirection,
  AnimationItem,
  RendererType,
  TextDocumentData,
} from 'lottie-web';
import { LottiePlayer } from 'ngx-lottie/lib/symbols';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return player;
}

export function mockPlayerFactory(): LottiePlayer {
  return {
    play(_name?: string) {},
    pause(_name?: string) {},
    stop(_name?: string) {},
    setSpeed(_speed: number, _name?: string) {},
    setDirection(_direction: AnimationDirection, _name?: string) {},
    searchAnimations(
      _animationData?: unknown,
      _standalone?: boolean,
      _renderer?: string
    ) {},
    loadAnimation<T extends RendererType = 'svg'>(
      _parameters: AnimationConfigWithPath<T> | AnimationConfigWithData<T>
    ): AnimationItem {
      return { destroy: () => {} } as AnimationItem;
    },
    destroy(_name?: string) {},
    registerAnimation(_element: Element, _animationData?: unknown) {},
    setQuality(_quality: string | number) {},
    setLocationHref(_href: string) {},
    setIDPrefix(_prefix: string) {},
    updateDocumentData(
      _path: (string | number)[],
      _documentData: TextDocumentData,
      _index: number
    ) {},
  };
}
