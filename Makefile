FILES = \
	src/hexgrid_geo.js \
	src/point_geo.js \
	src/projection_aep.js \
	src/projection_noop.js \
	src/projection_sin.js \
	src/projection_sm.js \
	index.js \
	package.json \
	LICENSE \
	README.md

.PHONY: copy
copy:
	mkdir -p package
	@- $(foreach file,$(FILES), \
		cp $(file) ./package/$(notdir $(file)); \
	)
