---
layout: post
title: "Keeping your scientific data files small"
date: 2025-04-22
author: Bart Schilperoort
published: true
source: medium
source_url: https://blog.esciencecenter.nl/keeping-your-scientific-data-files-small-e17f1c2469bd
tags:
  - uncategorized

---

# **Keeping your scientific data files small**

## An RSE’s guide to NetCDF compression

If you’ve ever watched a crawling progress bar while transferring research data, or received a dreaded ‘storage quota exceeded’ message, you’re not alone. Researchers across disciplines face a common challenge: the size of collected data can outpace storage and processing capabilities. This blog explores how compression techniques for NetCDF (Network Common Data Form) files — a format commonly used for multidimensional scientific data — can reduce storage requirements while maintaining data integrity. Whether you’re handling climate models, GIS data, or sensor networks, these approaches can change how you manage and access multidimensional data, such as data with both time and spatial coordinates.

![Keeping your scientific data files small](/assets/keeping-your-scientific-data-files-small-98bdacab.jpeg)
Simplified structure of a netCDF file (from the [xarray documentation](https://docs.xarray.dev/en/latest/user-guide/data-structures.html#dataset)); created by Stephan Hoyer, Apache 2.0 license).If you have multidimensional data, the file sizes can get big quite fast. Take output from the [ERA5 global weather reanalysis](https://www.ecmwf.int/en/forecasts/dataset/ecmwf-reanalysis-v5) product:

* It has a resolution of 0.25 degrees, at an hourly frequency.
* This means that there are 720x1440x365x24 = 9 billion data points per variable per year.
* This type of data is usually represented as [32-bit floating points numbers](https://en.wikipedia.org/wiki/Single-precision_floating-point_format).
* 32 bits equals 4 bytes, times 9 billion; approximately 36 GB/year. Per variable.

As soon as you want to analyze multiple years, for multiple variables, your required storage can quickly reach dozens of terabytes. Storing all this data can not only be prohibitively difficult or expensive, it also significantly increases your carbon footprint. Luckily, there are multiple ways to reduce the file size of netCDF files, with various up- and downsides.

### Lossless compression**

You are probably familiar with putting files on your computer in a zip folder. This can significantly reduce their size (if the data is not already compressed yet):

![Keeping your scientific data files small](/assets/keeping-your-scientific-data-files-small-b8c718e0.png)
*Lossless compression of a simple 19 kB python code file*You can then retrieve the exact files from the zip folder, without any loss of information. This is called “lossless” compression. Many files on your computer are compressed in this way already (for example, Microsoft Office files, or PDF documents).

**Lossy compression**

A different compression method you probably have encountered before is lossy compression. Lossy compression is often applied to audio, images and video to dramatically reduce their size (~10x for audio or still images, 100x for video), with little *perceived* quality loss.

![Keeping your scientific data files small](/assets/keeping-your-scientific-data-files-small-74813b92.png)
*Very lossy JPEG compression versus lossless PNG. Source: *[*Wikimedia*](https://commons.wikimedia.org/wiki/File:Comparison_of_JPEG_and_PNG.png)A downside of lossy compression is that each time you open the data and would write it away lossily again, additional compression artifacts are introduced. This will cause a gradual degradation in data quality.

## Compressing netCDF files

As a quick refresher, we need to discuss how netCDF files are structured.

NetCDF files organize the data per variable. Each variable in turn is split up in different “chunks”. These chunks correspond to subsets of the full array. For example, data can be chunked only in time, where each chunk represents the entire physical domain (latitude &amp; longitude) for a single time coordinate.

![Keeping your scientific data files small](/assets/keeping-your-scientific-data-files-small-16368190.png)
*Graphical representation of chunks in the xarray python package, using Dask*These chunks are read into memory one at a time, so for any operations it is important that the chunks fit your analysis for efficiency.

The actual underlying data can be stored as 32-bit floating point numbers on disk, but there are a few options for compression.

**Lossless netCDF compression**

Just like with text files or other documents, lossless compression is possible for netCDF files. The more repetitious your data is, the easier it is for lossless compression algorithms to compress your data.

cdo -z zip 4 ... # where 4 is the compression level (1 - 9)In Python, with the popular ‘xarray’ package, you can instead do:

import xarray as xr

ds = xr.open_dataset("my_dataset.nc")
encoding = {"my_variable": {"zlib": True, "complevel": 4}}
ds.to_netcdf("compressed_dataset.nc", encoding=encoding)In many cases applying lossless compression to your data can reduce the size on disk by 20–50%. This comes at a cost of slightly more CPU use, while disk I/O usage is lower.

The exact impact on your analysis speed will depend on your system, but unless you have a slow CPU and a blazingly fast disk your further analyses will likely be faster when you compress your data. Therefore it’s best to default to using some form of lossless compression on your netCDF files, unless you have a specific reason not to.

Lossy netCDF compression**

As stated earlier, unlike lossless compression, lossy compression does not preserve the full original data. Some of the original resolution can be lost, while offering a much smaller file size as well as a faster read speed.

Often some loss of resolution is not a problem, as 32-bit floating point numbers offer more precision than many measurements or model data realistically have.

One way of lossy compression which is well supported by netCDF is encoding floating point numbers to integers. This is usually done with 16-bit unsigned integers: whole numbers ranging from 0 to 65,535. The floating point numbers can then be mapped to this range.

For example; as the lowest ambient air temperature ever recorded on earth is 184 K, and the highest 330 K, giving a range of 146 K. To convert the temperature, you take the integer value, multiply it with a ‘scale factor’, and add the offset. The temperature range can thus be divided over 65,535 discrete values, translating into a maximum resolution of ~2.23 mK, which is a much higher resolution than most scientific air temperature sensors. Your offset here would be 184 K.

Integer encoding works very well for climate data as the range of values that you can expect should be very well constrained. This allows you to make informed estimates of what sufficient precision is for these variables, while still significantly reducing the size of the data on disk.

When using integer encoding in xarray you can specify the encoding as such:

import xarray as xr**
ds = xr.open_dataset("my_dataset.nc")

fvalue = 65535  # fill value for missing values
scale = 0.005  # store temperature in 5 mK increments
offset = 0  # Kelvin is abolute: no offset required

encoding = {
    "my_temperature_variable": 
    {
        '_FillValue': fvalue, 'scale_factor': scale, 'add_offset': offset, 'dtype': 'int16',
        "zlib": True, "complevel": 4,  # you can still use lossless compression!
    },
}

ds.to_netcdf("compressed_dataset.nc", encoding=encoding)For Climate Data Operators users, the [“pack” operator](https://code.mpimet.mpg.de/projects/cdo/embedded/index.html#x1-1130002.2.4) is available for this purpose.

Compression ‘filters’**

Lastly, HDF5; the underlying data format of netCDF4 files, has “filter plugins” available. These plugins allow you to use other lossy compression algorithms for your netCDF data. These filters are a more advanced use case and not as easy to set up as the other compression methods.

Some publications (e.g., [Prims, 2024](https://gmd.copernicus.org/articles/17/8909/2024/), and [Delauney, 2019](https://gmd.copernicus.org/articles/12/4099/2019/#section14))) have studied the effect of these on netCDF and numerical weather prediction data specifically.

Depending on the variables, these compression algorithms can reduce the data size on disk by a factor of 5–150. However, unlike integer compression, the effects of these compression algorithms on your data is not as easily predictable, and you might need to do a sensitivity study for your own application.

However, there are use cases such as many climate model ensembles where compressing the data lossily could be a way to store data that would otherwise be too large to store.

**Compression and chunks**

As the underlying data of each variable in a netCDF file is organized in “chunks”, the compression algorithm is applied per chunk. *This allows you to still load individual chunks of data without requiring to load and decompress the entire file.

Therefore it is important to organize these chunks in a way that aligns well with your intended usage; for example, either looking at the full time series for a single location, or the entire world at a single point in time. This will enable you to read parts of your full netCDF file very quickly and store them efficiently.

## Conclusion

Compressing your netCDF data can reduce your disk usage significantly, which allows you to store or share data more easily. For most users lossless compression is the most straightforward and should be applied by default.

For many others, where storage space is a constraint, storing your floating point numbers as 16-bit integers is a predictable way of compressing your data further. Other lossy algorithms are available, but are generally too complex to use for most users.

![Keeping your scientific data files small](/assets/keeping-your-scientific-data-files-small-e8dca7c8.jpg)
Photo by [Jason Pofahl](https://unsplash.com/@jasonpofahlphotography?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)
