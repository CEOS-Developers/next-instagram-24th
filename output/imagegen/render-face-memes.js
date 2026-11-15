// Run with: osascript -l JavaScript output/imagegen/render-face-memes.js "$PWD"
// Uses original repository photos; no generated or modified faces.
ObjC.import('AppKit');

function run(argv) {
  var root = argv[0];
  var size = 1254;
  function color(hex) {
    return $.NSColor.colorWithSRGBRedGreenBlueAlpha(((hex >> 16) & 255) / 255,
      ((hex >> 8) & 255) / 255, (hex & 255) / 255, 1);
  }
  function rect(x, y, w, h) { return $.NSMakeRect(x, size - y - h, w, h); }
  function fill(x, y, w, h, hex) {
    color(hex).setFill;
    $.NSBezierPath.fillRect(rect(x, y, w, h));
  }
  function text(value, x, y, w, h, points, hex) {
    var paragraph = $.NSMutableParagraphStyle.alloc.init;
    paragraph.alignment = $.NSTextAlignmentCenter;
    paragraph.lineSpacing = 6;
    var font = $.NSFont.fontWithNameSize('AppleSDGothicNeo-Bold', points);
    var attributes = $({NSFont: font, NSColor: color(hex === undefined ? 0xffffff : hex),
      NSParagraphStyle: paragraph});
    $(value).drawInRectWithAttributes(rect(x, y, w, h), attributes);
  }
  function photo(name, x, y, w, h) {
    var image = $.NSImage.alloc.initWithContentsOfFile(root + '/public/images/' + name);
    var s = image.size;
    var scale = Math.max(w / s.width, h / s.height);
    var cw = w / scale, ch = h / scale;
    var source = $.NSMakeRect((s.width - cw) / 2, (s.height - ch) / 2, cw, ch);
    image.drawInRectFromRectOperationFraction(rect(x, y, w, h), source,
      $.NSCompositingOperationSourceOver, 1);
  }
  function render(name, draw) {
    var bitmap = $.NSBitmapImageRep.alloc
      .initWithBitmapDataPlanesPixelsWidePixelsHighBitsPerSampleSamplesPerPixelHasAlphaIsPlanarColorSpaceNameBytesPerRowBitsPerPixel(
        null, size, size, 8, 4, true, false, $.NSDeviceRGBColorSpace, 0, 0);
    $.NSGraphicsContext.saveGraphicsState;
    var context = $.NSGraphicsContext.graphicsContextWithBitmapImageRep(bitmap);
    $.NSGraphicsContext.setCurrentContext(context);
    context.imageInterpolation = $.NSImageInterpolationHigh;
    fill(0, 0, size, size, 0x101012);
    draw();
    $.NSGraphicsContext.restoreGraphicsState;
    var data = bitmap.representationUsingTypeProperties($.NSBitmapImageFileTypePNG, $({}));
    if (!data.writeToFileAtomically(root + '/public/images/' + name, true)) {
      throw new Error('Could not save ' + name);
    }
  }
  render('funny-02-review-faces.png', function () {
    text('내 코드 리뷰 받을 때', 24, 25, 1206, 88, 76);
    photo('siu.png', 24, 126, 474, 470);
    fill(514, 126, 716, 470, 0x252126);
    text('이 코드는...', 548, 196, 648, 85, 64, 0xffd65c);
    text('제가 짠 게\n맞긴 한데요', 548, 300, 648, 185, 72);
    text('(일단 목이 마름)', 548, 520, 648, 45, 30, 0xb8aeb7);
    fill(24, 620, 1206, 3, 0x555259);
    text('남의 코드 리뷰할 때', 24, 650, 1206, 88, 76);
    photo('funnymessi.png', 24, 752, 474, 478);
    fill(514, 752, 716, 478, 0x1d2921);
    text('여기 왜', 548, 805, 648, 90, 76, 0xbaf48c);
    text('이렇게\n짜셨어요? ^^', 548, 900, 648, 190, 74);
    text('(세상에서 제일 즐거움)', 548, 1150, 648, 45, 30, 0xa2b9a6);
  });
  render('funny-05-dolphin-debug.png', function () {
    text('시니어한테 코드 설명하는 나', 20, 30, 1214, 95, 68);
    photo('messi-dolphin.png', 24, 150, 770, 974);
    fill(24, 1020, 770, 104, 0x101012);
    text('"아까까진 됐는데요..."', 40, 1043, 738, 66, 48, 0xffd65c);
    fill(814, 150, 416, 78, 0x355d31);
    text('설명 시작', 824, 166, 396, 56, 45);
    photo('funnymessi.png', 814, 228, 416, 356);
    fill(814, 584, 416, 68, 0x233b21);
    text('"진짜 간단해요 ㅎㅎ"', 822, 602, 400, 48, 32);
    fill(814, 678, 416, 78, 0x963827);
    text('버그 발견', 824, 694, 396, 56, 45);
    photo('siu.png', 814, 756, 416, 368);
    text('설명하다가 내가 고침', 24, 1155, 1206, 78, 66, 0xffd65c);
  });
  return 'Saved both original-face memes.';
}
