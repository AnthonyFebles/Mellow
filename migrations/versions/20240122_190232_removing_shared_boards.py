"""removing shared_boards

Revision ID: bf4a5e50b63c
Revises: 8583e6d3c1cd
Create Date: 2024-01-22 19:02:32.004775

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bf4a5e50b63c'
down_revision = '8583e6d3c1cd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('shared_boards')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('shared_boards',
    sa.Column('user_id', sa.INTEGER(), nullable=False),
    sa.Column('board_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['board_id'], ['boards.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('user_id', 'board_id')
    )
    # ### end Alembic commands ###
