docker run --rm -it -v %cd%:/data -w /data f5devcentral/containthedocs:latest make -C docs html
docker run --rm -it -v %cd%:/data -w /data f5devcentral/containthedocs:latest make -C docs spelling
