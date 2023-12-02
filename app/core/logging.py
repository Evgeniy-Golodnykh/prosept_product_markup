import logging

LOG_FORMAT = '%(asctime)s %(levelname)s %(filename)s/%(funcName)s %(message)s'
DATETIME_FORMAT = '%d.%m.%Y %H:%M:%S'


def configure_logging():
    logging.basicConfig(
        datefmt=DATETIME_FORMAT,
        format=LOG_FORMAT,
        level=logging.INFO,
    )
