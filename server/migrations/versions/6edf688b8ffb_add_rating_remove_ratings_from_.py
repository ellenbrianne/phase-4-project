"""add Rating, remove ratings from Experience

Revision ID: 6edf688b8ffb
Revises: 8dcb2ba3e965
Create Date: 2024-02-04 02:26:47.077423

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6edf688b8ffb'
down_revision = '8dcb2ba3e965'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('ratings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('community', sa.Integer(), nullable=True),
    sa.Column('crowds', sa.Integer(), nullable=True),
    sa.Column('safety', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_ratings'))
    )
    with op.batch_alter_table('experiences', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rating_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_experiences_rating_id_ratings'), 'ratings', ['rating_id'], ['id'])
        batch_op.drop_column('safety')
        batch_op.drop_column('crowds')
        batch_op.drop_column('community')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('experiences', schema=None) as batch_op:
        batch_op.add_column(sa.Column('community', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('crowds', sa.INTEGER(), nullable=True))
        batch_op.add_column(sa.Column('safety', sa.INTEGER(), nullable=True))
        batch_op.drop_constraint(batch_op.f('fk_experiences_rating_id_ratings'), type_='foreignkey')
        batch_op.drop_column('rating_id')

    op.drop_table('ratings')
    # ### end Alembic commands ###