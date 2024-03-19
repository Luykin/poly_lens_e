#!/bin/bash

# This script takes source SVG files, and:
# 1. generates PNG files for Mac
# 2. generates and then stores multiple PNG files into an ico file for Windows consumption

# To run this file, ensure `inkscape` is a valid command line tool
# if not, try `brew cask install inkscape` on Mac. Also, the `convert`
# command is used in this script; if it is not available using
# `which convert`, you may need to `brew install imagemagick`.
# Finally, cd into the scripts directory and run this directly, e.g. `./resize_and_generate_ico.sh`

# Need to crop the white space from SVGs?  For instance, Figma might export
# a 24x24 SVG that has 3-4 units on each side.  When resizing this to 16x16,
# the icon is basically unusable.  Inkscape can be used for this operation,
# just open the document and go to File -> Document Properties ->
# Resize page to content... -> Resize page to drawing or selection ("Ctrl+Shift+R" shortcut).

# inkscape can be run as a one-off, for instance to create a 512x512 PNG
# inkscape -z -o disconnected_black.png -w "512" -h "512" disconnected_black.svg > /dev/null 2> /dev/null

cd ../workspaces/angular-app/src/assets/icons/tray

sizes=(16 32 48 128 256 512)
# future capability, e.g. (2 3 4)
# Electron does not seem to pick these up as documentation indicates
# @help https://www.electronjs.org/docs/api/native-image
high_dpi_resolutions=(2 3 4)

for file in *.svg; do
    # get filename without extension
    prefix="${file%.*}"
    echo "Found $prefix.svg"

    files=()
    rmFiles=()
    for size in "${sizes[@]}"; do
        echo "Generating ${prefix}_${size}.png"

        # generate PNG of proper size
        inkscape -z -o "${prefix}_${size}.png" -w "$size" -h "$size" $prefix.svg > /dev/null 2> /dev/null
        filename="${prefix}_${size}.png"
        files+=("$filename")

        rmFiles+=("$filename")
    done

    # output baseline PNG for Mac
    echo "Generating base 16x16 Mac icon ${prefix}.png"
    # for specific icons, such as charging, handle using special image processing;
    # alternatively, could have one-off tiny icons fixed by graphic design team
    if [[ $prefix = mac_charging* ]]
    then
        # NOTE this specific pass produces a slightly different PNG each run
        # improve crispness of tiny 16x16 (default non-HiDPI Mac) icons
        dpi_size=20
        # use the largest PNG, and adaptive resizing to get close to the size of the final 16x16 icon
        # adaptive-resize does not perform anti-aliasing/blurring effects on pixels
        convert "${prefix}_${size}.png" -adaptive-resize ${dpi_size}x${dpi_size} "${prefix}.png"
        dpi_size=16
        # this pass performs anti-aliasing/blurring
        convert "${prefix}.png" -resize ${dpi_size}x${dpi_size} "${prefix}.png"
    else
        dpi_size=16
        inkscape -z -o "${prefix}.png" -w "$dpi_size" -h "$dpi_size" $prefix.svg > /dev/null 2> /dev/null
    fi

    echo "SVG found, creating $prefix.ico from PNGs."
    # adding `-colors 256` or `-colors 65536` creates color aberrations
    convert "${files[@]}" $prefix.ico

    echo "Mac SVG found, creating HiDPI variants."
    for high_dpi in "${high_dpi_resolutions[@]}"; do
        dpi_text="@${high_dpi}x"
        echo "Generating High DPI Mac icon ${prefix}${dpi_text}.png"
        # @help for Mac retina / high DPI support, see https://www.electronjs.org/docs/api/native-image
        # generate high DPI PNGs
        dpi_size=$((high_dpi * 16))
        inkscape -z -o "${prefix}${dpi_text}.png" -w "$dpi_size" -h "$dpi_size" $prefix.svg > /dev/null 2> /dev/null
    done

    # development: can help to exit early before generating all files
#    exit 0

    echo "Removing intermediary files"
    rm "${rmFiles[@]}"
done

echo "Done"
