"""init

Revision ID: 73ce2745d5e2
Revises: 
Create Date: 2023-12-02 12:01:38.268567

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '73ce2745d5e2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('dealer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    op.create_table('product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('article', sa.String(length=100), nullable=False),
    sa.Column('ean_13', sa.String(length=100), nullable=True),
    sa.Column('name', sa.String(length=5000), nullable=False),
    sa.Column('cost', sa.String(length=100), nullable=True),
    sa.Column('recommended_price', sa.String(length=100), nullable=True),
    sa.Column('category_id', sa.String(length=100), nullable=True),
    sa.Column('ozon_name', sa.String(length=5000), nullable=True),
    sa.Column('name_1c', sa.String(length=5000), nullable=True),
    sa.Column('wb_name', sa.String(length=5000), nullable=True),
    sa.Column('ozon_article', sa.String(length=100), nullable=True),
    sa.Column('wb_article', sa.String(length=100), nullable=True),
    sa.Column('ym_article', sa.String(length=100), nullable=True),
    sa.Column('wb_article_td', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=320), nullable=False),
    sa.Column('hashed_password', sa.String(length=1024), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_superuser', sa.Boolean(), nullable=False),
    sa.Column('is_verified', sa.Boolean(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=True)
    op.create_table('dealerprice',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product_key', sa.String(), nullable=False),
    sa.Column('price', sa.String(length=100), nullable=True),
    sa.Column('product_url', sa.String(length=5000), nullable=True),
    sa.Column('product_name', sa.String(length=5000), nullable=False),
    sa.Column('date', sa.Date(), nullable=False),
    sa.Column('status', sa.Enum('none', 'true', 'false', 'delay', name='markupstatus'), nullable=False),
    sa.Column('dealer_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['dealer_id'], ['dealer.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('productdealerkey',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('key_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.Column('create_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['key_id'], ['dealerprice.product_key'], ),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('key_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('productdealerkey')
    op.drop_table('dealerprice')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    op.drop_table('product')
    op.drop_table('dealer')
    # ### end Alembic commands ###
