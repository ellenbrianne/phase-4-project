"""create models and relationships

Revision ID: 586fe641b239
Revises: 4c81ed6af548
Create Date: 2024-01-04 17:53:17.612478

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '586fe641b239'
down_revision = '4c81ed6af548'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('locations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('city', sa.String(), nullable=True),
    sa.Column('state', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_locations'))
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users'))
    )
    op.create_table('experiences',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('length', sa.String(), nullable=True),
    sa.Column('community', sa.Integer(), nullable=True),
    sa.Column('crowds', sa.Integer(), nullable=True),
    sa.Column('safety', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('location_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['location_id'], ['locations.id'], name=op.f('fk_experiences_location_id_locations')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_experiences_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_experiences'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('experiences')
    op.drop_table('users')
    op.drop_table('locations')
    # ### end Alembic commands ###